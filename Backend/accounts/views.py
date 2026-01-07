from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return HttpResponse("Accounts Index For Testing.")
