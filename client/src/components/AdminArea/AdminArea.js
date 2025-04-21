import React from 'react';

function AdminArea(props) {
    return (
        <div className="admin-area">
            <div className="admin-action">Public/private</div>
            <div className="admin-action">Audio Only / Video only</div>
            <div className="admin-action">Filter Urls</div>
        </div>
    )
}

export default AdminArea;