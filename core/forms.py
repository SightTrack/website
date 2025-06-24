from django import forms
from django_recaptcha.fields import ReCaptchaField
from django_recaptcha.widgets import ReCaptchaV2Checkbox


class ContactForm(forms.Form):
    name = forms.CharField(
        max_length=100,
        widget=forms.TextInput(attrs={
            'placeholder': 'Your full name',
            'class': 'form-input',
            'id': 'name'
        })
    )
    
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={
            'placeholder': 'your.email@example.com',
            'class': 'form-input',
            'id': 'email'
        })
    )
    
    subject = forms.CharField(
        max_length=200,
        widget=forms.TextInput(attrs={
            'placeholder': "What's this about?",
            'class': 'form-input',
            'id': 'subject'
        })
    )
    
    message = forms.CharField(
        max_length=2000,
        widget=forms.Textarea(attrs={
            'placeholder': 'Tell us more about your question or feedback...',
            'class': 'form-textarea',
            'id': 'message'
        })
    )
    
    captcha = ReCaptchaField(
        widget=ReCaptchaV2Checkbox(
            attrs={
                'data-theme': 'dark',  # Use dark theme to match your site
                'data-size': 'normal',
            }
        )
    ) 