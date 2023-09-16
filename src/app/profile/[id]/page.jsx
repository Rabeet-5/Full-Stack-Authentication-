const UserProfile = ({ params }) => {
    return (
      <>
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
          <h1 className="text-2xl"> Profile Page
          <span className="text-2xl bg-orange-400 p-2">{params.id}</span>
          </h1>
        </div>
      </>
    );
  };
  
  export default UserProfile;