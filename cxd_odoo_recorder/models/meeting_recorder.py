from odoo import models, fields

class MeetingRecorder(models.Model):
    _name = "meeting.recorder"
    _inherit = ["mail.thread", "mail.activity.mixin"]
    _description = "Meeting Recorder"

    name = fields.Char(default="Name")
    state = fields.Selection([
        ('draft', 'Draft'),
        ('recording', 'Recording'),
        ('done', 'Done')
    ], default='draft')

    video = fields.Binary("Recorded Video", attachment=True)
    filename = fields.Char(string="Filename")
    user_id = fields.Many2one("res.users", default=lambda self: self.env.user)
