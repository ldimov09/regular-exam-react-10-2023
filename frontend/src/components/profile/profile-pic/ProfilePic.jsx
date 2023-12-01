export default function ProfilePic({userProfilePic, size}) {

    const profilePicCss = userProfilePic ? 'url("http://localhost:3000/uploads/' + userProfilePic + '")' : 'url("http://localhost:3000/uploads/no-image.png")';

    return (
        <div className='profile-pic' style={{ backgroundImage: profilePicCss, width: size, height: size, borderRadius: size/2 }}>
        </div>
    );
}