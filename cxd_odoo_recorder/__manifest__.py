{
    "name": "Screen Recorder",
    "version": "19.0.0.1",
    "summary": "Record your screen with audio and save videos directly in Odoo",
    "description": """
        The Screen Recorder addon lets users record their screen, browser tab,
        or application directly from Odoo using the browser’s native recorder.

        Each video is saved as a separate Odoo record with user and timestamp.
        Audio can be captured by enabling 'Share audio' in the browser popup.

        No external tools required. All recordings are securely stored in Odoo.
    """,

    "category": "Tools",
    "depends": ["base", "web", "mail"],
    "website": "https://crewxdev.com",
    'images': ['images/banner.jpg'],
    "author": "crewxdev",
    "assets": {
        "web.assets_backend": [
            "cxd_odoo_recorder/static/src/js/recorder.js",
            "cxd_odoo_recorder/static/src/js/video_player.js",
            "cxd_odoo_recorder/static/src/xml/recorder.xml",
            "cxd_odoo_recorder/static/src/xml/video_player.xml",
        ],
    },
    "data": [
        "security/ir.model.access.csv",
        "views/meeting_recorder.xml",
    ],
    "installable": True,
    "application": True,
}
