import { faShoppingBag, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Image from "next/image";
import type { FunctionComponent } from "react";
import {
  contentContainerStyle,
  contentStyle,
  discountedTagTextStyle,
  discountTagContainerStyle,
  discountTagStyle,
  discountTagTextStyle,
  h1Style,
  h2Style,
  h3Style,
  imageStyle,
  imageStyles,
  mainContentStyle,
  mainStyle,
  payButtonLargeStyle,
  payButtonLargeTwoStyle,
  previewContainerStyle,
  reviewAuthorStyle,
  reviewStarsStyle,
  reviewStyle,
  reviewsStyle,
  strongStyle,
  videoContainerStyle,
} from "./styles.css";

export const Main: FunctionComponent = () => {
  return (
    <main className={mainStyle}>
      <div className={mainContentStyle}>
        <div className={contentContainerStyle}>
          <span className={contentStyle}>
            <h1 className={h1Style}>Tavs ceļojums uz Šrilanku</h1>
            <p>
              <strong className={strongStyle}>Čau! Esmu Grieta.</strong> Jau
              vairāk nekā pusotru gadu dzīvoju Šrilankā. Kad pirmo reizi ierados
              2023. gadā, pieļāvu daudz kļūdu — nepareizi autobusi, nepiemērotas
              viesnīcas, nedrošas situācijas. Tieši tā es iemācījos ceļot
              gudrāk.{" "}
            </p>
            <p>
              Šis{" "}
              <strong className={strongStyle}>
                ceļvedis nav gatavs maršruts
              </strong>
              , bet praktisks padomu krājums ar visu svarīgāko, kas jāzina pirms
              ceļojuma — vīzas, transports, naktsmītnes, drošība, aktivitātes un
              vēl daudz kas cits. Viss ir pārbaudīts un noderīgs, lai tu varētu
              ceļot{" "}
              <strong className={strongStyle}>
                ērtāk, drošāk un baudīt Šrilanku pilnībā.
              </strong>
            </p>
            <p>
              Okeāns, kalni, safari, tējas plantācijas un bagātīga kultūra —
              Šrilanka piedāvā visu vienā ceļojumā. Šis ceļvedis palīdzēs tev
              atklāt labākās vietas un izvairīties no vilšanās, lieka laika un
              naudas tērēšanas.
            </p>
          </span>
          <div className={imageStyle}>
            <span className={discountTagContainerStyle}>
              <span className={discountedTagTextStyle}>€23.95</span>
              <span className={discountTagTextStyle}>€16.70</span>
              <img
                className={discountTagStyle}
                src="/discount-tag.png"
                alt="tag"
                width={140}
                height={140}
              />
            </span>
            <Image
              className={imageStyles}
              src="/srilanka-lv_cover.png"
              alt="SriLanka.lv cover"
              width={400}
              height={390}
            />
          </div>
        </div>
        <iframe
          className={videoContainerStyle}
          width="560"
          height="315"
          src="https://www.youtube.com/embed/WgujR_rR9j4?si=GDAb--PCHgygAB5W"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <div className={previewContainerStyle}>
          <h2 className={h2Style}>Dienvidu Šrilankas pērles</h2>
          <Image
            className={imageStyles}
            src="/srilanka-lv_inside.jpg"
            alt="SriLanka.lv preview"
            width={900}
            height={834}
          />
        </div>
        <a
          href="https://payhip.com/b/2mq5J"
          className={clsx("payhip-buy-button", payButtonLargeStyle)}
          data-theme="none"
          data-product="2mq5J"
        >
          <FontAwesomeIcon icon={faShoppingBag} />
          Pirkt ceļvedi
        </a>
        <h3 className={h3Style}>Ko saka citi?</h3>
        <div className={reviewsStyle}>
          <article className={reviewStyle}>
            <span className={reviewStarsStyle}>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span>
              Lielisks ceļvedis! Skaidri maršruti, noderīgi padomi par
              autobusiem un drošību. Ieteiktu visiem, kas plāno dienvidus.
            </span>{" "}
            <span className={reviewAuthorStyle}>
              <Image
                src="/srilanka-lv_review-1-m.png"
                alt="SriLanka.lv review Jānis Bērziņš"
                width={40}
                height={40}
              />
              Jānis Bērziņš
            </span>
          </article>
          <article className={reviewStyle}>
            <span className={reviewStarsStyle}>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span>
              Iegādājos pirms brauciena — izglāba mani no daudzām kļūdām. Kartes
              un adreses perfekti noderēja.
            </span>{" "}
            <span className={reviewAuthorStyle}>
              <Image
                src="/srilanka-lv_review-1-f.png"
                alt="SriLanka.lv review Ilze Jansone"
                width={40}
                height={40}
              />
              Ilze Jansone
            </span>
          </article>
          <article className={reviewStyle}>
            <span className={reviewStarsStyle}>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span>
              Autore dalās ar reālām pieredzēm — jutās kā ceļabiedrs. Viegli
              saprotams un informatīvs.
            </span>{" "}
            <span className={reviewAuthorStyle}>
              <Image
                src="/srilanka-lv_review-2-f.png"
                alt="SriLanka.lv review Jānis Bērziņš"
                width={40}
                height={40}
              />
              Līga Ozola
            </span>
          </article>
          <article className={reviewStyle}>
            <span className={reviewStarsStyle}>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span>
              Skaisti noformēts un praktisks. Īpaši noderēja ēdienu ieteikumi un
              budžeta padomi.
            </span>{" "}
            <span className={reviewAuthorStyle}>
              <Image
                src="/srilanka-lv_review-2-m.png"
                alt="SriLanka.lv review Ilze Jansone"
                width={40}
                height={40}
              />
              Andris Ozoliņš
            </span>
          </article>

          <article className={reviewStyle}>
            <span className={reviewStarsStyle}>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span>
              Praktiski padomi par sezonām, transportu un vietējiem paradumiem
              ļāva man ļoti ātri saplānot ceļojumu. Ceļvedis bija ļoti
              informatīvs un viegli saprotams.
            </span>{" "}
            <span className={reviewAuthorStyle}>
              <Image
                src="/srilanka-lv_review-3-m.png"
                alt="SriLanka.lv review Jānis Bērziņš"
                width={40}
                height={40}
              />
              Rihards Liepiņš
            </span>
          </article>
          <article className={reviewStyle}>
            <span className={reviewStarsStyle}>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span>
              Ceļvedis sniedz visu no A līdz Z, sākot ar ieceļošanu Šrilankā un
              beidzot ar ieteikumiem par galamērķa pārvietošanos. Teksts ir
              viegli lasāms un piedāvā konkrētus risinājumus visām situācijām.
            </span>{" "}
            <span className={reviewAuthorStyle}>
              <Image
                src="/srilanka-lv_review-3-f.png"
                alt="SriLanka.lv review Ilze Jansone"
                width={40}
                height={40}
              />
              Marija Zvaigzne
            </span>
          </article>
        </div>
        <a
          href="https://payhip.com/b/2mq5J"
          className={clsx("payhip-buy-button", payButtonLargeTwoStyle)}
          data-theme="none"
          data-product="2mq5J"
        >
          <FontAwesomeIcon icon={faShoppingBag} />
          Pirkt ceļvedi
        </a>
      </div>
    </main>
  );
};
