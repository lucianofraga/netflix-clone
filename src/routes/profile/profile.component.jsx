import { useSelector } from 'react-redux';
import Navigation from '../../components/navigation/navigation.component';
import './profile.styles.css';
import { selectUser } from '../../features/user/userSlice';
import { auth } from '../../firebase';
import Plans from '../../components/plans/plans.component';

const Profile = () => {
  const loggedUser = useSelector(selectUser);
  const signOut = () => {
    auth.signOut();
  };
  return (
    <>
      <div className="profileScreen">
        <Navigation />
        <div className="profileScreen__body">
          <h1>Edit Profile</h1>
          <div className="profileScreen__Info">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt=""
            />
            <div className="profileScreen__details">
              <h2>{loggedUser.email}</h2>
                          <div className="profileScreen__plans">
                              <h3>Plans</h3>
                              <Plans />
                <button className="profileScreen__signOut" onClick={signOut}>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
