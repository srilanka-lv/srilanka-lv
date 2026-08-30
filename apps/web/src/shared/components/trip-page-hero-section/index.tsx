import Image from 'next/image';

import { GIRLS_TRIP_DATES_DISPLAY } from '@/shared/constants/girls-trip-dates';
import { GIRLS_TRIP_PRICE_DISPLAY } from '@/shared/constants/girls-trip-price';

import { TripPageHeroSectionCta } from '../trip-page-hero-section-cta';
import {
  tripPageHeroSectionDescriptionParagraphStyle,
  tripPageHeroSectionDescriptionStyle,
  tripPageHeroSectionStyle,
  tripPageImageGalleryMainImagePriceStyle,
  tripPageImageGalleryMainImagePriceSubtitleStyle,
  tripPageImageGalleryMainImageStyle,
  tripPageImageGalleryStyle,
  tripPageImageGalleryThumbnailImageStyle,
  tripPageImageGalleryThumbnailsContainerStyle,
  tripPageSummaryItemSeparatorStyle,
  tripPageSummaryItemStyle,
  tripPageSummaryItemTitleStyle,
  tripPageSummaryItemValueListItemExcludedStyle,
  tripPageSummaryItemValueListItemIncludedStyle,
  tripPageSummaryItemValueListStyle,
  tripPageSummaryItemValueStyle,
  tripPageSummaryStyle,
} from './styles.css';

export const TripPageHeroSection = () => (
  <section className={tripPageHeroSectionStyle}>
    <div className={tripPageImageGalleryStyle}>
      <span className={tripPageImageGalleryMainImageStyle}>
        <span className={tripPageImageGalleryMainImagePriceStyle}>
          <span>{GIRLS_TRIP_PRICE_DISPLAY}</span>
          <span className={tripPageImageGalleryMainImagePriceSubtitleStyle}>
            no personas / 10 dienas
          </span>
        </span>
        <Image
          src="/images/srilanka-lv_10-dienu-celojums_apmeklejot-udenskritumu.webp"
          alt="Laura Grieta no srilanka.lv apmeklē ūdenskritumu Šrilankā"
          fill
          objectFit="cover"
          sizes="(min-width: 1024px) 66vw, 100vw"
          priority
          quality={75}
        />
      </span>
      <span className={tripPageImageGalleryThumbnailsContainerStyle}>
        <span className={tripPageImageGalleryThumbnailImageStyle}>
          <Image
            src="/images/srilanka-lv_10-dienu-celojums_latviesu-meitenu-grupa-atpusas-pie-baseina-srilanka.webp"
            alt="Latviešu meiteņu grupa atpūšas pie baseina Šrilankā"
            fill
            sizes="(min-width: 1024px) 22vw, 80vw"
            priority
            quality={75}
          />
        </span>
        <span className={tripPageImageGalleryThumbnailImageStyle}>
          <Image
            src="/images/srilanka-lv_10-dienu-celojums_rita-joga-srilankas-tropiskaja-atmosfera.webp"
            alt="Rīta joga Šrilankas tropiskajā atmosfērā"
            fill
            sizes="(min-width: 1024px) 22vw, 80vw"
            priority
            quality={75}
          />
        </span>
        <span className={tripPageImageGalleryThumbnailImageStyle}>
          <Image
            src="/images/srilanka-lv_meitenu-celojums_saulrieta-serfosana.webp"
            alt="Sērfošana ar meitenēm Šrilankā"
            fill
            sizes="(min-width: 1024px) 22vw, 80vw"
            priority
            quality={75}
          />
        </span>
        <span className={tripPageImageGalleryThumbnailImageStyle}>
          <Image
            src="/images/srilanka-lv_10-dienu-celojums_atputa-pludmale-ar-zilam-debesim-un-skaistu-apkartni.webp"
            alt="Atpūta pludmalē ar zilām debesīm un skaistu apkārtni"
            fill
            sizes="auto"
            quality={75}
          />
        </span>
        <span className={tripPageImageGalleryThumbnailImageStyle}>
          <Image
            src="/images/srilanka-lv_meitenu-celojums_srilankas-okeans.webp"
            alt="Zilais, tropiskais okeāns Šrilankā"
            fill
            sizes="auto"
            quality={75}
          />
        </span>
        <span className={tripPageImageGalleryThumbnailImageStyle}>
          <Image
            src="/images/srilanka-lv_10-dienu-celojums_izbaudiet-serfosanu-smiltis-starp-kaju-pirkstiem-un-tropiskos-kokosriekstus.webp"
            alt="Izbaudiet sērfošanu, smiltis starp kāju pirkstiem un tropiskos kokosriekstus"
            fill
            sizes="auto"
            quality={75}
          />
        </span>
      </span>
      <div className={tripPageHeroSectionDescriptionStyle}>
        <p className={tripPageHeroSectionDescriptionParagraphStyle}>
          10 dienu ceļojums pa Šrilanku kopā ar mani, mazā, līdz 7 cilvēku sieviešu grupā. Aktīvs,
          iedvesmojošs un pilnībā noorganizēts ceļojums, kuru Tu vari vienkārši baudīt.
          {` `}
          <strong>Šis nav tikai ceļojums. Tā ir pieredze.</strong>
        </p>
        <p className={tripPageHeroSectionDescriptionParagraphStyle}>
          Pirms 5 gadiem es pati devos ceļā un mājās tā arī neatgriezos. Es iemīlēju šo brīvības
          sajūtu, citādo kultūru un dzīves ritmu, un atradu savas mājas Šrilankā. Tagad es vēlos Tev
          parādīt šo valsti tā, kā to redzu es, ne tikai kā tūristam, bet no iekšpuses.
        </p>
        <p className={tripPageHeroSectionDescriptionParagraphStyle}>
          Mēs kopā izbaudīsim gan Šrilankas skaistākos “highlights”, gan vietas, kuras parasti
          tūristi neatrod. Redzēsim okeānu, kalnus, tējas plantācijas, piedzīvosim safari,
          meistarklases un īsto vietējo dzīvi.
        </p>
        <p className={tripPageHeroSectionDescriptionParagraphStyle}>
          Bet pats svarīgākais, šis ceļojums nav tikai par Šrilanku.{' '}
          <strong>Tas ir par piedzīvojumiem, smiekliem, emocijām un jauniem draugiem.</strong> Šis
          ir Tavs brīdis piedzīvot, izkāpt no savas komforta zonas un varbūt pat atklāt ko jaunu par
          sevi.
        </p>
      </div>
    </div>
    <div className={tripPageSummaryStyle}>
      <div className={tripPageSummaryItemStyle}>
        <span className={tripPageSummaryItemTitleStyle}>Brauciena ilgums</span>
        <strong className={tripPageSummaryItemValueStyle}>10 dienas</strong>
      </div>
      <div className={tripPageSummaryItemStyle}>
        <span className={tripPageSummaryItemTitleStyle}>Datumi</span>
        <strong className={tripPageSummaryItemValueStyle}>{GIRLS_TRIP_DATES_DISPLAY}</strong>
      </div>
      <span className={tripPageSummaryItemSeparatorStyle} />
      <div className={tripPageSummaryItemStyle}>
        <span className={tripPageSummaryItemTitleStyle}>Ceļojuma veids</span>
        <strong className={tripPageSummaryItemValueStyle}>Aktīvs ceļojums</strong>
      </div>
      <div className={tripPageSummaryItemStyle}>
        <span className={tripPageSummaryItemTitleStyle}>Cik vietas?</span>
        <strong className={tripPageSummaryItemValueStyle}>7. meitenes</strong>
      </div>
      <span className={tripPageSummaryItemSeparatorStyle} />
      <div className={tripPageSummaryItemStyle}>
        <span className={tripPageSummaryItemTitleStyle}>Brauciena sākums</span>
        <strong className={tripPageSummaryItemValueStyle}>Negombo, Sri Lanka</strong>
      </div>
      <div className={tripPageSummaryItemStyle}>
        <span className={tripPageSummaryItemTitleStyle}>Ceļojuma beigas</span>
        <strong className={tripPageSummaryItemValueStyle}>Negombo, Sri Lanka</strong>
      </div>
      <span className={tripPageSummaryItemSeparatorStyle} />
      <div className={tripPageSummaryItemStyle}>
        <span className={tripPageSummaryItemTitleStyle}>Cenā iekļauts</span>
        <ul className={tripPageSummaryItemValueListStyle}>
          <li className={tripPageSummaryItemValueListItemIncludedStyle}>Aktivitātes</li>
          <li className={tripPageSummaryItemValueListItemIncludedStyle}>Naktsmājas</li>
          <li className={tripPageSummaryItemValueListItemIncludedStyle}>Transports</li>
          <li className={tripPageSummaryItemValueListItemIncludedStyle}>Vīza</li>
        </ul>
      </div>
      <div className={tripPageSummaryItemStyle}>
        <span className={tripPageSummaryItemTitleStyle}>Cenā nav iekļauts</span>
        <ul className={tripPageSummaryItemValueListStyle}>
          <li className={tripPageSummaryItemValueListItemExcludedStyle}>Apdrošināšana</li>
          <li className={tripPageSummaryItemValueListItemExcludedStyle}>Ēšana</li>
          <li className={tripPageSummaryItemValueListItemExcludedStyle}>Lidojuma biļetes</li>
          <li className={tripPageSummaryItemValueListItemExcludedStyle}>Personīgās izmaksas</li>
        </ul>
      </div>
      <span className={tripPageSummaryItemSeparatorStyle} />
      <TripPageHeroSectionCta />
    </div>
  </section>
);
