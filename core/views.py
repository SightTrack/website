from django.http import HttpResponse
from django.shortcuts import render
from django.core.mail import send_mail
from django.conf import settings
from django.contrib import messages
from django.core.cache import cache
from .forms import ContactForm
import re
import time


def index(request):
    return render(request, "core/index.html", {})

def get_started(request):
    return render(request, "core/get_started.html", {})

def donate(request):
    return render(request, "core/donate.html", {})

def learn_more(request):
    return render(request, "core/learn_more.html", {})

def about_us(request):
    return render(request, "core/about_us.html", {})

def legal(request):
    return render(request, "core/legal.html", {})

def is_spam(name, email, subject, message):
    """Basic spam detection"""
    spam_keywords = [
        'viagra', 'casino', 'lottery', 'winner', 'congratulations',
        'bitcoin', 'cryptocurrency', 'investment opportunity', 'make money',
        'click here', 'limited time', 'act now', 'free money', 'guaranteed',
        'seo', 'backlinks', 'website traffic', 'marketing services'
    ]
    
    # Combine all text for checking
    full_text = f"{name} {email} {subject} {message}".lower()
    
    # Check for spam keywords
    for keyword in spam_keywords:
        if keyword in full_text:
            return True, f"Spam keyword detected: {keyword}"
    
    # Check for excessive links
    url_pattern = r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+'
    urls = re.findall(url_pattern, message)
    if len(urls) > 2:
        return True, f"Too many URLs: {len(urls)}"
    
    # Check for excessive repetition
    words = message.lower().split()
    if len(words) > 10:
        word_count = {}
        for word in words:
            word_count[word] = word_count.get(word, 0) + 1
        
        # If any word appears more than 30% of the time, it's likely spam
        for word, count in word_count.items():
            if len(word) > 3 and count / len(words) > 0.3:
                return True, f"Excessive word repetition: {word}"
    
    # Check for suspicious email patterns
    suspicious_domains = ['tempmail', 'guerrillamail', '10minutemail', 'mailinator']
    email_domain = email.split('@')[-1].lower() if '@' in email else ''
    for domain in suspicious_domains:
        if domain in email_domain:
            return True, f"Suspicious email domain: {email_domain}"
    
    return False, ""

def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        
        # Get client IP for rate limiting
        client_ip = request.META.get('REMOTE_ADDR', '')
        if request.META.get('HTTP_X_FORWARDED_FOR'):
            client_ip = request.META.get('HTTP_X_FORWARDED_FOR').split(',')[0].strip()
        
        # Rate limiting: max 3 submissions per hour per IP
        rate_limit_key = f"contact_form_{client_ip}"
        submission_count = cache.get(rate_limit_key, 0)
        
        if submission_count >= 3:
            print(f"Rate limit exceeded for IP: {client_ip}")
            context = {
                'form': form,
                'error': True, 
                'error_message': 'Too many submissions. Please wait before sending another message.'
            }
            return render(request, "core/contact.html", context)
        
        if form.is_valid():
            # Get cleaned form data
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            subject = form.cleaned_data['subject']
            message = form.cleaned_data['message']
            
            # Spam detection
            is_spam_result, spam_reason = is_spam(name, email, subject, message)
            if is_spam_result:
                print(f"Spam detected from {email}: {spam_reason}")
                # Don't tell the user it's spam, just show generic error
                context = {
                    'form': ContactForm(),  # Reset form
                    'error': True, 
                    'error_message': 'Message could not be sent. Please try again later.'
                }
                return render(request, "core/contact.html", context)
            
            # Print the message contents (keep for debugging)
            print("=== CONTACT FORM SUBMISSION ===")
            print(f"IP: {client_ip}")
            print(f"Name: {name}")
            print(f"Email: {email}")
            print(f"Subject: {subject}")
            print(f"Message: {message}")
            print("CAPTCHA: Verified")
            print("================================")
            
            # Send email
            try:
                email_subject = f"SightTrack Contact Form: {subject}"
                email_message = f"""
New contact form submission from SightTrack website:

IP Address: {client_ip}
Name: {name}
Email: {email}
Subject: {subject}

Message:
{message}

---
This message was sent from the SightTrack contact form.
Reply directly to {email} to respond to the sender.

Security Info:
- Passed spam detection
- CAPTCHA verified
- Rate limit: {submission_count + 1}/3 submissions this hour
                """
                
                send_mail(
                    subject=email_subject,
                    message=email_message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.CONTACT_EMAIL],
                    fail_silently=False,
                )
                
                # Increment rate limit counter (expires in 1 hour)
                cache.set(rate_limit_key, submission_count + 1, 3600)
                
                print("Email sent successfully!")
                context = {'success': True, 'form': ContactForm()}  # Reset form on success
                
            except Exception as e:
                print(f"Error sending email: {e}")
                context = {
                    'form': form,
                    'error': True, 
                    'error_message': 'Message could not be sent. Please try again later.'
                }
                
            return render(request, "core/contact.html", context)
        else:
            # Form is not valid (including CAPTCHA failure)
            error_message = "Please correct the errors below."
            
            # Check if CAPTCHA specifically failed
            if 'captcha' in form.errors:
                error_message = "Please complete the CAPTCHA verification."
            elif form.non_field_errors():
                error_message = "Please check all fields and try again."
            
            context = {
                'form': form,
                'error': True,
                'error_message': error_message
            }
            return render(request, "core/contact.html", context)
    else:
        # GET request - show empty form
        form = ContactForm()
    
    return render(request, "core/contact.html", {'form': form})