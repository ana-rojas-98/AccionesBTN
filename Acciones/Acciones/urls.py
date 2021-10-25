from rest_framework import routers
from .api import LeadViewSet, ApiLeadViewSet, HistorialOrdenesViewSet

router = routers.DefaultRouter()
router.register('api/leads', LeadViewSet, 'leads')

router.register('api/apis', ApiLeadViewSet, 'apis')

router.register('api/historial', HistorialOrdenesViewSet, 'historial')

urlpatterns = router.urls