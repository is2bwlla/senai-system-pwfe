from django.urls import path
from .views import *
from django.conf import settings            #  -- São as configurações do django
from django.conf.urls.static import static      #  -- Ele que vai "permitir" que as urls possam passar arquivos também

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

    ### URLS DELETE IMAGES
    path('delete/<str:filename>', delete_file),

    ### URLS TOKEN
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
