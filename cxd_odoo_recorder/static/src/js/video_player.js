import { registry } from "@web/core/registry";
import { Component } from "@odoo/owl";

export class VideoBinaryPlayer extends Component {
    get videoUrl() {
        const { record, name } = this.props;
        console.log(this.props);
        console.log(record.resModel, record.resId, name);
        if (!record.resId) return "";
        return `/web/content?model=${record.resModel}&id=${record.resId}&field=${name}&filename=${record.data.filename}`;
    }
}

VideoBinaryPlayer.template = "VideoBinaryPlayer";

registry.category("fields").add("video_player", {
    component: VideoBinaryPlayer,
    supportedTypes: ["binary"],
});
