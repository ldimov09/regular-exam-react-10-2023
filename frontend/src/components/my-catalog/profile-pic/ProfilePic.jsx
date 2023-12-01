export default function ProfilePic({userProfilePic}) {

    const profilePicCss = userProfilePic ? 'url("http://localhost:3000/uploads/' + userProfilePic + '")' : 'url("http://localhost:3000/uploads/no-image.png")';

    return (
        <div className='profile-pic' style={{ backgroundImage: profilePicCss }}>
        </div>
    );
}