from rest_framework.pagination import CursorPagination
from rest_framework.response import Response


class SlotCursorPagination(CursorPagination):
    page_size = 10
    ordering = "-created_at"
    cursor_query_param = "page_cursor"

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link()
            },
            'results': data
        })
