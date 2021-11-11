import { app } from "./app";
import { mongoConnect } from "./db";

const PORT = process.env.PORT || 5050;

mongoConnect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on PORT ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });
