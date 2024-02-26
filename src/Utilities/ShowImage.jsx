export default function ShowImage(image_path) {
    let origin =
        import.meta.env.VITE_APP_ENV == "production"
            ? import.meta.env.VITE_PROD_ASSET_URL
            : import.meta.env.VITE_DEV_ASSET_URL;
    return origin + "/storage/" + image_path.replace(/\\/g, "/");
}
