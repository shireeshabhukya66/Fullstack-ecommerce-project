from django.db import models

# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.IntegerField()
    discount_price = models.IntegerField(null=True, blank=True)
    company = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    image = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'products'




        