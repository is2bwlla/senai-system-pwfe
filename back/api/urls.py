from django.urls import path
from .views import listar_professores, ProfessoresView, ProfessoresDetailView, SubjectsView, SubjectsDetailView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    ### URLS PROFESSORES
    path('professores', listar_professores),    # apagar dps essa aq pq ela e a url de baixo fazem a mesma coisa, é reduntante
    path('prof', ProfessoresView.as_view()),
    path('professor/<int:pk>', ProfessoresDetailView.as_view()),

    ### URLS SUBJECTS
    path('subjects', SubjectsView.as_view()),
    path('subject/<int:pk>', SubjectsDetailView.as_view()),

    ### URLS TOKEN
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
