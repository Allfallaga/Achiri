import React from 'react';
import Member from '../Member/Member';

function Moderation(props) {
    React.useEffect(() => {
        console.log(props.members)
        return () => {

        }
    }, [])
    return (
        <div className="moderation-area">
            <ul className="list-group">
                {
                    props.members?.map((mbr) => {
                        return (mbr.loggedIn && <Member key={mbr.nickname} member={mbr} />)
                    })
                }
            </ul>
        </div>
    )
}

export default Moderation;