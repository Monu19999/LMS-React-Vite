export default function ShowImage(image_path, directory = "storage") {
    console.log(directory);
    let origin =
        import.meta.env.VITE_APP_ENV == "production"
            ? import.meta.env.VITE_PROD_ASSET_URL
            : import.meta.env.VITE_DEV_ASSET_URL;
    return (
        origin +
        `/${directory ? directory + "/" : ""}` +
        image_path.replace(/\\/g, "/")
    );
}
