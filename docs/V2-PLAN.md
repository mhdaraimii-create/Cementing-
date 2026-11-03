# Cement Job Tool — v2 plan

Work branch: `v2-dev` (trial copy). `main` stays live on Netlify and is not touched until v2 is checked against the examples below and approved.

Sources reviewed: lab report (9⅝″ recipe), Gulf Energy 9⅝″ proposal and Abandonment/KOP proposal, PE Excel sheets (9⅝″ NIMR-1718, 7″ NIMR-1731), PDO OCTG booklet V15, field-coach decks "Casing Cementation" and "Well Abandonment" (A. Al Rubkhi).

## Decisions

- Capacity (L/m) = 0.5067 × ID² (inches). Annulus = outer capacity − 0.5067 × inner OD².
- 9⅝″ default is **40# (ID 8.835, 39.55 L/m)** — confirmed by the PE; the OCTG booklet has no 36#.
- Densities in kPa/m; hydrostatic (kPa) = height (m) × density (kPa/m); fresh water 9.81 kPa/m.
- Open questions get editable fields with defaults: stick-up 0 m; packs CDF-1 20 L, CFL-100/CD-200 25 kg; mix tank 5 m³ with 0.5 m³ dead. Pumping schedule: not built until asked.

## Data (OCTG booklet: size → weight → ID)

| Size | Weight (ID in) |
|---|---|
| 20″ | 133# (18.730) |
| 18⅝″ | 87.5# (17.755) |
| 13⅜″ | 54.5# (12.615) default, 72# (12.347) |
| 9⅞″ | 68.9# (8.475) |
| 9⅝″ | 40# (8.835) default, 47# (8.681, coach examples), 53.5# (8.535), 58# (8.475) |
| 7″ | 23# (6.366) default, 29# (6.184), 35# (6.004), 41# (5.820) |
| 5½″ | 17# (4.862), 23# (4.670) |
| 5″ | 15# (4.408), 20.3# (4.184) |
| 4½″ | 11.6# (4.000), 12.6/12.75# (3.958), 13.5# (3.920), 17# (3.740) |

Strings for liners/plugs (cap / closed-end displacement L/m): 5″ DP 19.5# 9.05 / 13.24; 3½″ tbg 9.2–9.3# ID 2.992; 2⅞″ tbg 6.4–6.5# ID 2.441; 2⅜″ tbg 4.6# ID 1.995. Open-end (metal) displacement = closed-end − capacity.

Holes: 36, 26, 17½, 16, 12¼, 10 (new), 8½, 6⅛. 8½″ × 7″ = 11.78 (fix from 11.71).

## Job types

1. **Casing / liner (existing)** — add: stick-up added to displacement length; mud volume = displacement − spacer behind; liner: cement above liner top (TOC above TOL, DP removed, full casing ID) and TOC with DP still in (= vol above TOL ÷ (casing cap − DP CED)).
2. **Two-stage** — stage tool depth; stage 1 from TD up to TOC1 (default = stage tool), incl. csg-csg part; stage 2 from stage tool up to TOC2 (input; may be surface); each stage own slurry/excess; displacement stage 1 to FC, stage 2 to stage tool; totals for both.
3. **Balanced plug(s)** — coach method: several plugs per job; plug interval may span OH and casing; volume = length × cap (excess on OH); string = DP + tubing stinger (stinger ≥ plug + ~30 m); rise with pipe in h = L × V_metal ÷ (cap − V_metal); spacer ahead height across csg/tbg then csg/DP annulus; spacer behind = same heights inside tbg/DP; mud = DP cap to top of spacer (+ tbg part); under-displace 0.3–0.5 m³ (input); pull-out depth.

## Extra outputs

- Mix water from lab ratio; spacer water per m³; number of mix tanks and total mix fluid prepared.
- Packs (drums/sacks) per additive with editable pack size.
- Volume without excess (minimum cement); half shoe-track volume (max over-displacement).
- Pressures (kPa): differential just before bump (incl. spacer ahead outside, spacer behind inside); minimum HH opposite a gas zone vs its pressure; HH at previous shoe vs formation strength.

## Verification cases (v2 must reproduce)

- **9⅝″ proposal**: TOC 581, FC 763.28, FS 777.34, TD 781, 12¼″, 39.55 / 29.10 / 76.04, 35% → annulus 7.71, shoe track 0.56, rat hole 0.38, total 8.6 m³, displacement 30.19 m³.
- **9⅝″ PE Excel**: TD 829, FC 810.92, shoe 825.04, TOC 629, caps 76.017/39.541/29.088, 35% → 8.105 + 0.558 = 8.663 m³; 12.34 MT; mix water 4.677; mix fluid 4.702; displacement (FC+1 m)×cap 32.104; unit 1.59 → rig 30.514 m³ → 2,241 stk (round up, 13.62 L/stk); CDF 24.68 L, CFL-100 61.70 kg, CD-200 49.36 kg.
- **7″ PE Excel (lead/tail)**: 9⅝″ shoe 777.99, tail top 893, FC 1062.37, FS 1089.26, TD 1093; csg-csg 14.72 (10%), OH 11.78 (25%), 8½″ 36.61, 7″ 20.53, stick-up 0.78 → lead OH 1.694, lead cased 12.597, tail OH 2.890, shoe track 0.552, rat hole 0.171 m³; displacement 21.83 m³.
- **Coach liner (Ex 2)**: 9⅝″ 47# shoe 3650 (38.19, CED 46.94), 8½″ TD 4455, 7″ 29# shoe 4450 (19.38, CED 24.83), TOL 3475, FC 4425, TOC 3425, 100% OH excess, 5″ DP 9.05/13.24 → 485 + 366 + 18,848 + 2,338 + 1,910 = 23,946 L; 31.7 MT (yield 0.758); TOC with DP in 3398 m; mud 48.9 m³ (1 m³ water behind); differential before bump 4,986 kPa (mud 13.5, cement 18.6, 3 m³ water ahead).
- **Coach two-stage (Ex 3)**: 9⅝″ 47# shoe 2800, 8½″ TD 3855, 7″ 29# shoe 3850, FC 3825, stage collar 2700, 30% → stage 1 = 485 + 238 + 16,080 + 1,336 = 18,138 L; 23.8 MT (0.761); mix water 10.6 + 2 spacer = 12.6 m³; mud 72,129 L (2 m³ behind); differential 6,737 kPa (mud 12.5, cement 18.6).
- **Coach plug (Abandonment Ex 3, field units)**: 9⅝″ 47# 0.0732 bbl/ft; plug 7550→7220 ft (330 ft); 3½″ 9.2# stinger 490 ft (cap 0.0087, CE 0.01208, OE 0.00338); 5″ DP (0.0172 / CE 0.0252); 5 bbl spacer ahead → cement 24.15 bbl; column with pipe in 346 ft; TOC 7204 ft; spacer behind 0.71 bbl; top of spacer 7122 ft; mud 122 bbl.

## Build order

Status: phases 1–5 built on `v2-dev` and checked against the cases above (liner 23,946 L / TOC with DP 3398 m / Δp 4,982 kPa; two-stage 18,139 L / Δp 6,737 kPa; plug 24.16 bbl, TOC 7205 ft; 9⅝″ PE sheet exact). Next: user review, then merge to `main`.

1. Data tables (booklet sizes/weights, strings, holes) + stick-up, mud = disp − spacer behind, liner extras.
2. Two-stage page.
3. Balanced plug page.
4. Mix tanks, packs, min volume, half shoe track, mix water from lab.
5. Pressures.
6. Check every verification case, then show the user before merging to `main`.
