import styles from "./footer.module.scss";
import { appConfig } from "@/appconfig";
import Link from "next/link";

export default function Footer():JSX.Element{
    return <div>
        <div className={`${styles.footer_container}`}>
            <div className={`${styles.footerDivider}`}>
                <div className={`${styles.footerLeft}`}>
                    <img src={`${appConfig.cloudpath}/images/RD_Footer_image.png`} alt="footerImg" />
                </div>
                <div className={`${styles.footerRight}`}>
                    <h2>Watch YuppTV anywhere anytime</h2>
                    <p >Download our top-rated app, made just for you!<br/> It’s free, easy and smart.</p>
                    <div className={`${styles.deviceList_1}`}>
                        <span>TV App's</span>
                        <ul>
                            <li>
                                <Link target="_blank" href="https://play.google.com/">
                                    <img alt="androidtv" src={`${appConfig.cloudpath}/images/multi-device-android-tv.png`}/></Link>
                            </li>
                            <li>
                                <a target="_blank" href="https://play.google.com/">
                                    <img alt="androidtv" src={`${appConfig.cloudpath}/images/multi-device-fire-tv.png`}/></a>
                            </li>
                            <li>

                                <a target="_blank" href="https://channelstore.roku.com/">
                                    <img  alt="rokutv" src={`${appConfig.cloudpath}/images/roku-tv.png`}/></a>
                            </li>
                            <li>
                                <a target="_blank" href="https://itunes.apple.com/">
                                    <img alt="apple" src={`${appConfig.cloudpath}/images/multi-device-apple-tv.png`}/></a>
                            </li>
                            <li>
                                <a target="_blank" href="https://itunes.apple.com/">
                                    <img alt="apple" src={`${appConfig.cloudpath}/images/multi-device-apple-tv.png`}/></a>
                            </li>
                            <li>
                                <a target="_blank" href="https://us.lgappstv.com/main/tvapp">
                                    <img alt="lgtv" src={`${appConfig.cloudpath}/images/multi-device-lg.png`}/></a>
                            </li>
                            <li>
                                <a target="_blank" href="https://www.samsung.com/in/apps/galaxy-store/">
                                    <img alt="samsung" src={`${appConfig.cloudpath}/images/multi-device-samsung.png`}/></a>
                            </li>
                        </ul>
                    </div>

                    <div className={`${styles.deviceList_1}`}>
                        <span>Mobile App's</span>
                        <ul>
                            <li>
                                <a target="_blank" href="https://itunes.apple.com/">
                                    <img alt="iosapp" src={`${appConfig.cloudpath}/images/multi-device-ios-2.png`}/></a>
                            </li>
                            <li>
                                <a target="_blank" href="http://ottapps.revlet.net/apps/android/yvs/YVS_V0.1.apk">
                                    <img alt="android-mobile" src={`${appConfig.cloudpath}/images/multi-device-android-mobile.png`}/></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className={`${styles.bottomLinks}`}>
            <div className={`${styles.bottomLeft}`}>
                <ul>
                    <li>
                        <a>Privacy Policy</a>
                    </li>
                    <li>
                        <a>Terms & Conditions</a>
                    </li>
                    <li>
                        <a>Help Center</a>
                    </li>
                    <li>
                        <a>Contact Us</a>
                    </li>
                </ul>
            </div>
            <div className={`${styles.bottomRight}`}>
                <ul>
                    <li>Connect with us :</li>
                    <li >
                        <a><img src="https://d2ivesio5kogrp.cloudfront.net/static/watcho/images/ott-facebook-follow.svg" alt="facebook"/></a>
                    </li>
                    <li>
                        <a><img src="https://d2ivesio5kogrp.cloudfront.net/static/watcho/images/ott-instagram-follow.svg" alt="instagram" /></a>
                    </li>
                    <li>
                        <a><img src="https://d2ivesio5kogrp.cloudfront.net/static/watcho/images/ott-twitter-follow.svg" alt="twitter"/></a>
                    </li>
                    <li>
                        <a><img src="https://d2ivesio5kogrp.cloudfront.net/static/watcho/images/ott-linkedin-follow.svg"  alt="linkedin"/></a>
                    </li>
                    <li>
                        <a><img src="https://d2ivesio5kogrp.cloudfront.net/static/watcho/images/ott-youtube-follow.svg" alt="youtube"/></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
}