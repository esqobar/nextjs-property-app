import {FaShare} from "react-icons/fa";
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";


const ShareButtons = ({ property }) => {

    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`

    return (
        <>
            <h3 className='text-xl font-bold text-center pt-2'>
                Share This Property
            </h3>
            <div className='flex gap-3 justify-center pb-5'>
                <FacebookShareButton
                    url={shareUrl}
                    quote={property.name}
                    hashtag={[ `#${property.type.replace(/\s/g, '')}ForRent` ]}>
                    <FacebookIcon size={40} round={true} />
                </FacebookShareButton>

                <TwitterShareButton
                    url={shareUrl}
                    quote={property.name}
                    hashtag={[`${property.type.replace(/\s/g, '')}ForRent`]}
                >
                    <TwitterIcon size={40} round={true} />
                </TwitterShareButton>

                <WhatsappShareButton
                    url={shareUrl}
                    quote={property.name}
                    separator=':: '  >
                    <WhatsappIcon size={40} round={true} />
                </WhatsappShareButton>

                <EmailShareButton
                    url={shareUrl}
                    quote={property.name}
                    body={`Check out this property listing: ${shareUrl}`} >
                    <EmailIcon size={40} round={true} />
                </EmailShareButton>
            </div>
        </>
    );
};

export default ShareButtons;