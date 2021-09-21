from rest_framework import routers
from .api import LeadViewSet, ApiLeadViewSet

router = routers.DefaultRouter()
router.register('api/leads', LeadViewSet, 'leads')

router.register('api/apis', ApiLeadViewSet, 'apis')

urlpatterns = router.urls