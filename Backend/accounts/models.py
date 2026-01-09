from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from .utils.states import INDIA_REGION_CHOICES
from .utils.districts import DISTRICT_CHOICES


class UserModelManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        """
        Create and save a regular user with the given email and password.
        """

        if not email:
            raise ValueError("The Email field must be set")

        email = self.normalize_email(email)

        user = self.model(
            email=email,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Create and save a Superuser.
        """

        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)



class User(AbstractBaseUser, PermissionsMixin):

    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    )

    first_name = models.CharField("First Name", max_length=150)
    last_name = models.CharField("Last Name", max_length=150)
    email = models.EmailField(unique=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)

    # credits
    credits = models.PositiveIntegerField(default=15)

    bio = models.TextField(blank=True, null=True)
    region = models.CharField(max_length=2, choices=INDIA_REGION_CHOICES)  # state/UT
    district = models.CharField(max_length=7, choices=DISTRICT_CHOICES)

    # dates
    date_joined = models.DateTimeField(auto_now_add=True)

    # permissions
    is_active = models.BooleanField(default=True,
                                    help_text='''Designates whether this user should be treated as active.
                                                 Unselect this instead of deleting accounts.''',
                                    verbose_name='Active status')

    is_staff = models.BooleanField(default=False,
                                   help_text='Designates whether the user can log into this admin site.'
                                             'No other Powers.',
                                   verbose_name='Staff status')

    is_blocked = models.BooleanField(default=False,
                                     help_text='Designates whether the user is blocked to use the app.',
                                     verbose_name='Blocked status')

    objects = UserModelManager()

    USERNAME_FIELD = "email"
    # REQUIRED_FIELDS is ONLY used by "createsuperuser" - not normal user.
    REQUIRED_FIELDS = ["first_name", "gender", "date_of_birth"]  # email & Password are required by default.

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return f"{self.id} - {self.first_name} ({self.email})"



class Skill(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    skill_text = models.CharField(max_length=350)
    created_at = models.DateTimeField('Creation Date/Time', auto_now_add=True)

    def __str__(self):
        return f"{self.id}: {self.skill_text}"


