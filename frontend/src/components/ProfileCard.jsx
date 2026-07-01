import { useEffect, useState } from "react";
import API from "../api/axios";

export default function ProfileCard() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const res = await API.get("/auth/profile");

            setUser(res.data.user);

        }

        catch(err){

            console.log(err);

        }

    };

    if(!user){

        return null;

    }

    return(

        <div className="card shadow p-3 mb-4">

            <h3>{user.name}</h3>

            <p>Email : {user.email}</p>

            <p>Role : {user.role}</p>

        </div>

    );

}