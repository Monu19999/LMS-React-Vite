import moment from "moment";

export default function DateFormat({
    date = new Date(),
    format = "DD/MM/YYYY",
}) {
    return moment(date).format(format);
}
