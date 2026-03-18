def navbar(request):
    return {
        "nav_items": [
            {"label": "Landing", "url_name": "core:landing"},
            {"label": "Communication", "url_name": "core:communication"},
            {"label": "Login", "url_name": "core:login"},
            {"label": "Registration", "url_name": "core:registration"}
        ]
    }