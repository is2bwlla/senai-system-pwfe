from django.db import models

class Professor(models.Model):
    ni = models.CharField(max_length=10)
    nome = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    ocup = models.CharField(max_length=255)
    cel = models.CharField(max_length=255)
    image = models.ImageField(upload_to="images/", blank=True, null=True)

    def __str__(self):
        return self.ni

class Subject(models.Model):
    code = models.CharField(max_length=255)
    subject = models.CharField(max_length=255)
    workload = models.IntegerField()    # Carga horária  -- é um int porque vou usar para fazer contas futuramente

    def __str__(self):
        return self.code

