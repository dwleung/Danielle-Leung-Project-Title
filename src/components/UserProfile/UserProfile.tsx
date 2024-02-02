import { useState, useEffect } from "react";
import axios from "axios";

interface UserInfo {
	id: number | undefined;
	name: string;
	// prompts: string[],
	// ideas: object[]
}

export default function UserProfile() {
	const [isLoading, setIsLoading] = useState(true);
	const [userInfo, setUserInfo] = useState<UserInfo>({
		id: undefined,
		name: "",
	});
	const [errorMessage, setErrorMessage] = useState("");
	const token = localStorage.getItem("JWT token");

	useEffect(() => {
		if (!token) {
			return;
		}

		const fetchUserProfile = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}profile`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setIsLoading(false);
				setUserInfo({
					id: response.data.id,
					name: response.data.name,
				});
			} catch (error) {
				setErrorMessage(
					`There was an issue getting your profile: ${error}`
				);
			}
		};

		fetchUserProfile();
	}, [token]);

	if (isLoading) {
		<h1>Loading...</h1>;
	}

	return (
		<div className="profile">
			<h2>Welcome back, {userInfo.name}</h2>
			<div>
				<h3>Prompts</h3>
				{/* Map thought array of prompts
                    
                    {prompts.map ((prompt)=>{
                         return (
                              <p>{prompt}</p>
                         )
                    })

                    }
                    */}
			</div>
			<div>
				<h3>"My" Ideas</h3>
				{/* map through array of ideas 
                    {ideas.map((idea)=>{
                         return (
                              <div className="profile__idea">
                              <Link to="/profile/ideas/:id">
                              <div>{idea.title}</div> </Link>
                              </div>
                         )
                    })}
                    
                    */}
			</div>
		</div>
	);
}
