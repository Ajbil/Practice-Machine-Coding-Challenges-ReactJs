import React, {useState, useEffect} from "react"

const UserList = () => {
    const [ users, setUsers] = useState([]); // here i will store the complte user list fetched form API
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async() => {
            try{
                //Example API: https://jsonplaceholder.typicode.com/users
                const res = await fetch("https://jsonplaceholder.typicode.com/users");
                if(!res.ok){
                    throw new Error("Failed to fetch users"); 
                }
                const data = await res.json();
                setUsers(data);
            }
            catch(err){
                setError(err.message || "Something went wrong");
            }
            finally{
                setLoading(false);
            }
        };

        //call this function - IMP step
        fetchUsers();

    },[]); // this will run once when component is rendered initially 


    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredUsers = users.filter((user) => {
        return user.username.toLowerCase().includes(search.toLowerCase().trim())  //most imp logic
    });

    if(loading) return <p> Loading users...</p>
    if(error) return <p style={{ color:"red" }}>{error}</p>;

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <h2> Usernames </h2>
            
            <input
            type="text"
            placeholder="Search username....."
            value={search}
            onChange={handleSearchChange}
            style={{ width: "100%", padding: "8px", marginBottom: "12px" }}></input>

            <ul>
                {filteredUsers.map((user) => {
                   return  <li key={user.id}>{user.username}</li>
                })}
            </ul>

            {filteredUsers.length === 0 && <p>No user found..</p>}
        </div>
    )
};


export default UserList;