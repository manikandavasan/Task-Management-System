from django.urls import path
from .views import *

urlpatterns = [
    path('tasks/create/<int:id>', create_task),
    path('tasks/<int:id>', get_tasks),
    path('tasks/get_task/<int:id>', get_task),
    path('signup/', sign_up),
    path('signin/', sign_in, name='signin'),
    path('tasks/delete/<int:id>/', delete_task),
    path('tasks/update/<int:id>/', update_task),
]

