import { GIRLS_TRIP_GUESTS } from '@/shared/constants/girls-trip-booking';

import { TripPageSection } from '../trip-page-section';
import { tripPageUspItemListItemStyle, tripPageUspItemListStyle } from './styles.css';

export const TripPageUspSection = () => (
  <TripPageSection id="kapec-tev-patiks" title="Kāpēc Tev patiks šis ceļojums" trackingId="why">
    <ul className={tripPageUspItemListStyle}>
      <li className={tripPageUspItemListItemStyle}>
        Šādi galamērķi kā Šrilanka ir ārpus komforta zonas mums visām, un tas palīdzēs atklāt puses,
        kuras pati pat par sevi nezināji. Šis ir ne tikai tropisks ceļojums, bet laiks sev. Atlaist
        vaļā kontroli, uzticēties ceļam un, galvenais, noķert baudu pilnīgi svešā vidē, citā kultūrā
        un jaunā kompānijā.
      </li>
      <li className={tripPageUspItemListItemStyle}>
        Apceļosim galvenās Šrilankas vietas, kuras tik tiešām ir vērts apskatīt. Kalnus, pludmales,
        ūdenskritumus, tējas plantācijas. Ceļojums būs aktīvs, jo parādīšu, cik Šrilanka var būt
        daudzveidīga. Katrs varēs atrast savu mīļāko Šrilankas stūrīti.
      </li>
      <li className={tripPageUspItemListItemStyle}>
        Rādīšu Šrilanku no savas pieredzes. Vietas man ir jau zināmas, tāpēc vari uzticēties man.
        Gribu, lai vari pilnīgi atslābt no ikdienas un atvērt acis kaut kam jaunam. Šrilanka ir
        manas mājas jau vairāk nekā četrus gadus, un, ja jau kādu laiku seko @dzivetropos, varēsi
        pieredzēt, kā patiesi ir dzīvot Šrilankā.
      </li>
      <li className={tripPageUspItemListItemStyle}>
        Aktīva atpūta. Būs iespēja sērfot, piedalīties jogas nodarbībās, taisīt gredzenus, baudīt
        Šrilankas virtuvi, brauksim gan pa upi, gan piedzīvosim brīvdabas ziloņu safari. Ja esi par
        jauniem piedzīvojumiem, šis ir ceļojums Tev.
      </li>
      <li className={tripPageUspItemListItemStyle}>
        Ceļojumā brauksim maza meiteņu grupa: {GIRLS_TRIP_GUESTS} meitenes un es kā Tava latviešu
        gide. Šī ir Tava iespēja iepazīt līdzīgi domājošus cilvēkus un, cerams, pat draudzenes uz
        visu mūžu.
      </li>
    </ul>
  </TripPageSection>
);
