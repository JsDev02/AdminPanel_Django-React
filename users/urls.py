from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import CustomTokenObtainPairView, UserView

router = DefaultRouter()
router.register(r'users', UserView, basename='user')

urlpatterns = [
    path('api/', include(router.urls)),  # Se mantiene el "api/" aquí
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
