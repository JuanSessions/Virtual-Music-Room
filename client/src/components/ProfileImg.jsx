import React, { useState } from 'react'
import { FilePond, registerPlugin } from "react-filepond"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import "filepond/dist/filepond.min.css"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

registerPlugin(
    FilePondPluginImagePreview, FilePondPluginImageResize, FilePondPluginFileValidateType
)

export default function ProfileImgUploader(props) {
    const [profileImg, setProfileImg] = useState([])

    return (
        <div className="profile-img-upload">
            <FilePond
                name="profile"
                files={profileImg}
                onupdatefiles={setProfileImg}
                server={"/users/" + props.userId + "/upload"}
                maxFiles={1}
                allowFileTypeValidation
                acceptedFileTypes={['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']}
                fileValidateTypeLabelExpectedTypesMap={{ 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' }}
                labelFileTypeNotAllowed={'Upload only images (jpeg, png, webp, gif)'}
                maxTotalFileSize={10485760}
                labelMaxTotalFileSize={'Total file size should be lesser than 10MB.'}
                allowImageResize={true}
                imageResizeTargetWidth="200px"
                className="filepath"
            />
        </div>
    )
}
