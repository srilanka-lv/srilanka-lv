import { Heading } from '../heading';
import {
  tripPageUspItemListItemStyle,
  tripPageUspItemListStyle,
  tripPageUspSectionStyle,
  tripPageUspTitleStyle,
} from './styles.css';

export const TripPageUspSection = () => (
  <section className={tripPageUspSectionStyle}>
    <Heading as="h2" variant="h2" className={tripPageUspTitleStyle}>
      Kāpēc jums patiks šis ceļojums
    </Heading>
    <ul className={tripPageUspItemListStyle}>
      <li className={tripPageUspItemListItemStyle}>
        Šādi galamērķi kā Šrilanka ir ārpus komforta zonas mums visām, un tas palīdzēs atklāt puses,
        kuras pati pat par sevi nezināji. Šis ir ne tikai tropiskai ceļojums, bet laiks sev. Atlaist
        vaļā kontroli, uzticēties ceļam un galvenais noķert baudu pilnīgi svešā vidē, citā kultūrā
        un jaunā kompānijā.
      </li>
      <li className={tripPageUspItemListItemStyle}>
        Apceļosim galvenās Šrilankas vietas, kuras tik tiešām ir vērts apskatīt. Kalnus, pludmales,
        ūdenkritumus, tējas plantācijas. Ceļojums būs aktīvs, jo parādīšu cik Šrilanka var būt
        daudzveidīga. Katrs varēs atrast savu mīļāko Šrilankas stūrīti.
      </li>
      <li className={tripPageUspItemListItemStyle}>
        Rādīšu Šrilanu no savas pieredzes. Vietas man ir jau zināmas, tāpēc vari uzticēties man.
        Gribu lai vari pilnīgi atslābt no ikdienas un atvēr acis kaut kam jaunam. Šrilanka ir manas
        mājas jau 4 gadus, un ja jau kādu laiku seko @dzivetropos varēsi pieredzēt kā patiesi ir
        dzīvot Šrilankā.
      </li>
      <li className={tripPageUspItemListItemStyle}>
        Aktīva atpūta. Būs iespēja sērfot, piedalīties jogas nodarbībās, teisīt gredzenus, baudīt
        Šrilankas virtuvi, brauksim gan pa upi, gan piedzīvosim brīvdabas ziloņu safari. Ja esi par
        jauniem piedzīvojumiem, šis ir ceļojums Tev.
      </li>
      <li className={tripPageUspItemListItemStyle}>
        Ceļojumā brauksim maza meiteņu grupa. Kopā 7 meitenes, (ieskaitot mani). Šī ir tava iespēja
        iepazīt līdzīgi domājošus cilvēkus un cerams pat draudzenes uz visu mūžu.
      </li>
    </ul>
  </section>
);
