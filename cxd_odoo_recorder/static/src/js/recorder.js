/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

class MeetingRecorderSystray extends Component {
    setup() {
        this.orm = useService("orm");
        this.state = useState({ recording: false });

        this.chunks = [];
        this.mediaRecorder = null;
        this.stream = null;
        this.isClosed = false;
    }

    async toggle() {
        try {
            if (!this.state.recording) {

                this.isClosed = false;

                const stream = await navigator.mediaDevices.getDisplayMedia({
                    video: true,
                    audio: true
                });

                if (this.isClosed) return;

                this.stream = stream;
                this.mediaRecorder = new MediaRecorder(stream);
                this.chunks = [];

                this.mediaRecorder.ondataavailable = (e) => {
                    if (this.isClosed) return;
                    this.chunks.push(e.data);
                };

                this.mediaRecorder.onstop = () => {
                    if (this.isClosed) return;
                    this.upload();
                };

                this.mediaRecorder.start();
                this.state.recording = true;

            } else {
                this.stop();
            }
        } catch (err) {
            console.warn("Recorder cancelled or failed:", err);
        }
    }

    stop() {
        this.isClosed = true;

        if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
            this.mediaRecorder.stop();
        }

        if (this.stream) {
            this.stream.getTracks().forEach(t => t.stop());
        }

        this.state.recording = false;
    }

    async upload() {
        if (this.isClosed || !this.chunks.length) return;

        const blob = new Blob(this.chunks, { type: "video/webm" });
        const base64 = await this.toBase64(blob);

        if (!base64) return;

        const values = {
            name: "Quick Recording - " + new Date().toLocaleString(),
            video: base64,
            filename: `${new Date().toLocaleString()} recording.webm`,
            state: "done",
        };

        const [recordId] = await this.orm.create("meeting.recorder", [values]);
        console.log("Recording saved with ID:", recordId);
    }

    toBase64(blob) {
        return new Promise((resolve) => {
            const reader = new FileReader();

            reader.onloadend = () => {
                if (!reader.result) return resolve(null);
                const parts = reader.result.split(",");
                resolve(parts.length > 1 ? parts[1] : null);
            };

            reader.onerror = () => resolve(null);

            reader.readAsDataURL(blob);
        });
    }
}

MeetingRecorderSystray.template = "MeetingRecorderSystray";

registry.category("systray").add("meeting_recorder_systray", {
    Component: MeetingRecorderSystray,
});
