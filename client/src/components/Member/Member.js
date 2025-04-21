import React from 'react';
import { IoVolumeMuteSharp, IoVideocamOffSharp, IoBanSharp } from 'react-icons/io5'
import { ImEject } from 'react-icons/im'
import AuthContext from '../../context/AuthProvider'

function Member(props) {
    const { auth } = React.useContext(AuthContext)
    return (
        <li className="moderation-member">
            <div className="moderation-avatar-name-member">
                <img src="https://bootdey.com/img/Content/avatar/avatar4.png" className="rounded-circle mr-1 avatar-img" alt="Christina Mason" width="40" height="40" />
                <div className="moderation-status">
                    <span className="moderation-status-name">{props.member.nickname}</span>
                    <span className="moderation-status-status"></span> Online
                </div>
            </div>
            {/* <div className="moderation-controls">
                <span className="moderation-icon-control icon-mute">
                    <IoVolumeMuteSharp />
                </span>
                <span className="moderation-icon-control icon-video">
                    <IoVideocamOffSharp />
                </span>
            </div> */}

        </li>
    );
}

export default Member;