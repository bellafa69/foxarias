'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'

// ─── Asset paths ──────────────────────────────────────────────────────────────
const NAV_IMG = '/images/solo.ai/nav.png'
const SOC2_LOGO = '/images/solo.ai/soc2-logo.png'

// ─── SVG path data (inlined from svg-ammqdhjyhw.ts) ──────────────────────────
const svgPaths = {
  p161d4800: "M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z",
  p17a13100: "M14 2V6C14 6.53043 14.2107 7.03914 14.5858 7.41421C14.9609 7.78929 15.4696 8 16 8H20",
  p1d820380: "M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21",
  p1fe9dd00: "M16 3.13086C16.8604 3.35116 17.623 3.85156 18.1676 4.55317C18.7122 5.25478 19.0078 6.11769 19.0078 7.00586C19.0078 7.89403 18.7122 8.75694 18.1676 9.45855C17.623 10.1602 16.8604 10.6606 16 10.8809",
  p22bef200: "M17.5 19H9C7.70186 18.9997 6.42939 18.6384 5.32478 17.9565C4.22016 17.2746 3.32692 16.2989 2.74487 15.1386C2.16282 13.9783 1.91489 12.6789 2.02879 11.3858C2.14269 10.0927 2.61393 8.8567 3.38985 7.81598C4.16576 6.77526 5.2158 5.97079 6.4226 5.49248C7.62941 5.01418 8.94544 4.88087 10.2237 5.10746C11.5019 5.33405 12.6919 5.91161 13.6607 6.7756C14.6296 7.63959 15.3391 8.75598 15.71 10H17.5C18.6935 10 19.8381 10.4741 20.682 11.318C21.5259 12.1619 22 13.3065 22 14.5C22 15.6935 21.5259 16.8381 20.682 17.682C19.8381 18.5259 18.6935 19 17.5 19Z",
  p290131c0: "M22 21.0009V19.0009C21.9993 18.1146 21.7044 17.2536 21.1614 16.5532C20.6184 15.8527 19.8581 15.3524 19 15.1309",
  p2a7857e0: "M15 22V18C15.1391 16.7473 14.7799 15.4901 14 14.5C17 14.5 20 12.5 20 9C20.08 7.75 19.73 6.52 19 5.5C19.28 4.35 19.28 3.15 19 2C19 2 18 2 16 3.5C13.36 3 10.64 3 8 3.5C6 2 5 2 5 2C4.7 3.15 4.7 4.35 5 5.5C4.27187 6.51588 3.91847 7.75279 4 9C4 12.5 7 14.5 10 14.5C9.61 14.99 9.32 15.55 9.15 16.15C8.98 16.75 8.93 17.38 9 18V22",
  p2c300c0: "M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11",
  p2dfab7c0: "M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z",
  p38ffec00: "M12.22 2H11.78C11.2496 2 10.7409 2.21071 10.3658 2.58579C9.99071 2.96086 9.78 3.46957 9.78 4V4.18C9.77964 4.53073 9.68706 4.87519 9.51154 5.17884C9.33602 5.48248 9.08374 5.73464 8.78 5.91L8.35 6.16C8.04596 6.33554 7.70107 6.42795 7.35 6.42795C6.99893 6.42795 6.65404 6.33554 6.35 6.16L6.2 6.08C5.74106 5.81526 5.19584 5.74344 4.684 5.88031C4.17217 6.01717 3.73555 6.35154 3.47 6.81L3.25 7.19C2.98526 7.64893 2.91344 8.19416 3.05031 8.706C3.18717 9.21783 3.52154 9.65445 3.98 9.92L4.13 10.02C4.43228 10.1945 4.68362 10.4451 4.85905 10.7468C5.03448 11.0486 5.12789 11.391 5.13 11.74V12.25C5.1314 12.6024 5.03965 12.949 4.86404 13.2545C4.68844 13.5601 4.43521 13.8138 4.13 13.99L3.98 14.08C3.52154 14.3456 3.18717 14.7822 3.05031 15.294C2.91344 15.8058 2.98526 16.3511 3.25 16.81L3.47 17.19C3.73555 17.6485 4.17217 17.9828 4.684 18.1197C5.19584 18.2566 5.74106 18.1847 6.2 17.92L6.35 17.84C6.65404 17.6645 6.99893 17.5721 7.35 17.5721C7.70107 17.5721 8.04596 17.6645 8.35 17.84L8.78 18.09C9.08374 18.2654 9.33602 18.5175 9.51154 18.8212C9.68706 19.1248 9.77964 19.4693 9.78 19.82V20C9.78 20.5304 9.99071 21.0391 10.3658 21.4142C10.7409 21.7893 11.2496 22 11.78 22H12.22C12.7504 22 13.2591 21.7893 13.6342 21.4142C14.0093 21.0391 14.22 20.5304 14.22 20V19.82C14.2204 19.4693 14.3129 19.1248 14.4885 18.8212C14.664 18.5175 14.9163 18.2654 15.22 18.09L15.65 17.84C15.954 17.6645 16.2989 17.5721 16.65 17.5721C17.0011 17.5721 17.346 17.6645 17.65 17.84L17.8 17.92C18.2589 18.1847 18.8042 18.2566 19.316 18.1197C19.8278 17.9828 20.2644 17.6485 20.53 17.19L20.75 16.8C21.0147 16.3411 21.0866 15.7958 20.9497 15.284C20.8128 14.7722 20.4785 14.3356 20.02 14.07L19.87 13.99C19.5648 13.8138 19.3116 13.5601 19.136 13.2545C18.9603 12.949 18.8686 12.6024 18.87 12.25V11.75C18.8686 11.3976 18.9603 11.051 19.136 10.7455C19.3116 10.4399 19.5648 10.1862 19.87 10.01L20.02 9.92C20.4785 9.65445 20.8128 9.21783 20.9497 8.706C21.0866 8.19416 21.0147 7.64893 20.75 7.19L20.53 6.81C20.2644 6.35154 19.8278 6.01717 19.316 5.88031C18.8042 5.74344 18.2589 5.81526 17.8 6.08L17.65 6.16C17.346 6.33554 17.0011 6.42795 16.65 6.42795C16.2989 6.42795 15.954 6.33554 15.65 6.16L15.22 5.91C14.9163 5.73464 14.664 5.48248 14.4885 5.17884C14.3129 4.87519 14.2204 4.53073 14.22 4.18V4C14.22 3.46957 14.0093 2.96086 13.6342 2.58579C13.2591 2.21071 12.7504 2 12.22 2Z",
  p3c61fe80: "M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z",
  p3cccb600: "M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z",
  p3d58bb40: "M12 2C9.43223 4.69615 8 8.27674 8 12C8 15.7233 9.43223 19.3038 12 22C14.5678 19.3038 16 15.7233 16 12C16 8.27674 14.5678 4.69615 12 2Z",
  p51c6380: "M15.5 7.5L17.8 9.8C17.9869 9.98323 18.2382 10.0859 18.5 10.0859C18.7618 10.0859 19.0131 9.98323 19.2 9.8L21.3 7.7C21.4832 7.51307 21.5859 7.26175 21.5859 7C21.5859 6.73825 21.4832 6.48693 21.3 6.3L19 4",
  pace200: "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",
  pb47f400: "M15 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7L15 2Z",
  pd6d0500: "M20 13.0004C20 18.0004 16.5 20.5005 12.34 21.9505C12.1222 22.0243 11.8855 22.0207 11.67 21.9405C7.5 20.5005 4 18.0004 4 13.0004V6.00045C4 5.73523 4.10536 5.48088 4.29289 5.29334C4.48043 5.10581 4.73478 5.00045 5 5.00045C7 5.00045 9.5 3.80045 11.24 2.28045C11.4519 2.09945 11.7214 2 12 2C12.2786 2 12.5481 2.09945 12.76 2.28045C14.51 3.81045 17 5.00045 19 5.00045C19.2652 5.00045 19.5196 5.10581 19.7071 5.29334C19.8946 5.48088 20 5.73523 20 6.00045V13.0004Z",
  pff86670: "M7.5 21C10.5376 21 13 18.5376 13 15.5C13 12.4624 10.5376 10 7.5 10C4.46243 10 2 12.4624 2 15.5C2 18.5376 4.46243 21 7.5 21Z",
}

// ─── SVG mask data URIs (inlined from svg-rliw1.tsx) ─────────────────────────
const imgFrame67 = "data:image/svg+xml,%3Csvg%20preserveAspectRatio%3D%22none%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20overflow%3D%22visible%22%20style%3D%22display%3A%20block%3B%22%20viewBox%3D%220%200%201315%205790%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20id%3D%22Rectangle%2014%22%20width%3D%221315%22%20height%3D%225790%22%20fill%3D%22url(%23paint0_radial_5_800)%22%2F%3E%0A%3Cdefs%3E%0A%3CradialGradient%20id%3D%22paint0_radial_5_800%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientTransform%3D%22matrix(0.25001%203233.19%20-1281.39%200.182782%20657.75%202895)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22white%22%2F%3E%0A%3Cstop%20offset%3D%220.216346%22%20stop-color%3D%22white%22%20stop-opacity%3D%220.783654%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22white%22%20stop-opacity%3D%220%22%2F%3E%0A%3C%2FradialGradient%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E%0A"
const imgRectangle13 = "data:image/svg+xml,%3Csvg%20preserveAspectRatio%3D%22none%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20overflow%3D%22visible%22%20style%3D%22display%3A%20block%3B%22%20viewBox%3D%220%200%201440%20960%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20id%3D%22Shape%20Grid%22%20opacity%3D%220.2%22%20clip-path%3D%22url(%23clip0_5_557)%22%3E%3Cg%20id%3D%22Frame%22%20clip-path%3D%22url(%23clip1_5_557)%22%3E%3Crect%20id%3D%22Rectangle%22%20width%3D%2280%22%20height%3D%2280%22%20stroke%3D%22%2304C6B4%22%2F%3E%3Crect%20id%3D%22Rectangle_2%22%20x%3D%2280%22%20width%3D%2280%22%20height%3D%2280%22%20stroke%3D%22%2304C6B4%22%2F%3E%3Crect%20id%3D%22Rectangle_3%22%20x%3D%22160%22%20width%3D%2280%22%20height%3D%2280%22%20stroke%3D%22%2304C6B4%22%2F%3E%3Crect%20id%3D%22Rectangle_4%22%20x%3D%22240%22%20width%3D%2280%22%20height%3D%2280%22%20stroke%3D%22%2304C6B4%22%2F%3E%3Crect%20id%3D%22Rectangle_5%22%20x%3D%22320%22%20width%3D%2280%22%20height%3D%2280%22%20stroke%3D%22%2304C6B4%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3Cdefs%3E%3CclipPath%20id%3D%22clip0_5_557%22%3E%3Crect%20width%3D%221440%22%20height%3D%22960%22%20fill%3D%22white%22%2F%3E%3C%2FclipPath%3E%3CclipPath%20id%3D%22clip1_5_557%22%3E%3Crect%20width%3D%221440%22%20height%3D%2280%22%20fill%3D%22white%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E"

// ─── Frame dimensions ─────────────────────────────────────────────────────────
const FRAME_W = 1440
const FRAME_H = 900
const CHROME_H = 48.52
const CHROME_R = 20.217
const SOLOAI_NAV_H = Math.round(FRAME_W * (65 / 1463)) // ≈ 64px
const FAQ_END_IN_CONTENT = 4168 + 865 + 40 // ≈ 5073px

// ─── Animation timing ─────────────────────────────────────────────────────────
const DOWN_MS = 22000
const UP_MS = 17000
const PAUSE_MS = 2200

function ease(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

// ─── Browser chrome ───────────────────────────────────────────────────────────
function BrowserChrome() {
  return (
    <div style={{ height: CHROME_H, flexShrink: 0, background: '#e8e8e8', display: 'flex', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12.13, paddingLeft: 20.217 }}>
        {(['#ff5f57', '#febc2e', '#28c840'] as const).map((bg) => (
          <div key={bg} style={{ width: 16.173, height: 16.173, borderRadius: 8.087, background: bg, flexShrink: 0 }} />
        ))}
      </div>
    </div>
  )
}

// ─── SoloAi page component (ported from src/imports/SoloAi/index.tsx) ─────────

function Heading1() {
  return (
    <div className="h-[60px] relative shrink-0 w-[680px]" data-name="Heading 2">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[30px] left-[340px] not-italic text-[#d2d2d2] text-[20px] text-center top-0 tracking-[-0.4492px] w-[680px]">Built with security and privacy in mind, Solo AI protects your data with industry-leading compliance.</p>
    </div>
  )
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
      <div className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[0] min-w-full not-italic relative shrink-0 text-[56px] text-center text-white tracking-[0.3008px] w-[min-content]">
        <p className="leading-[61.6px] mb-0">All of your security needs,</p>
        <p className="leading-[61.6px]">managed.</p>
      </div>
      <Heading1 />
    </div>
  )
}

function Button() {
  return (
    <div className="bg-[#007d73] h-[48px] relative rounded-[8px] shrink-0 w-[185.453px]">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[93.5px] not-italic text-[16px] text-center text-white top-[11.5px] tracking-[-0.3125px] whitespace-nowrap">Trust Center</p>
    </div>
  )
}

function Button1() {
  return (
    <div className="h-[48px] relative rounded-[8px] shrink-0 w-[185.453px]">
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[8px]" />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[93px] not-italic text-[16px] text-center text-white top-[11.5px] tracking-[-0.3125px] whitespace-nowrap">Ask a Question</p>
    </div>
  )
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <Button />
      <Button1 />
    </div>
  )
}

function H() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-center relative shrink-0 w-[724px]">
      <Frame />
      <Frame1 />
    </div>
  )
}

function Paragraph() {
  return (
    <div className="h-[36px] relative shrink-0 w-full">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[36px] left-[599.57px] not-italic text-[#d2d2d2] text-[32px] text-center top-0 tracking-[0.0703px] whitespace-nowrap">{`Trusted by the world's fastest growing companies`}</p>
    </div>
  )
}

function Text() { return <div className="h-[30px] relative shrink-0 w-[58.445px]"><div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full"><p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] left-[29px] not-italic text-[20px] text-[rgba(255,255,255,0.4)] text-center top-0 tracking-[-0.4492px] whitespace-nowrap">Pendo</p></div></div> }
function Text1() { return <div className="h-[30px] relative shrink-0 w-[78.039px]"><div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full"><p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] left-[39.5px] not-italic text-[20px] text-[rgba(255,255,255,0.4)] text-center top-0 tracking-[-0.4492px] whitespace-nowrap">Descript</p></div></div> }
function Text2() { return <div className="h-[30px] relative shrink-0 w-[76.438px]"><div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full"><p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] left-[38px] not-italic text-[20px] text-[rgba(255,255,255,0.4)] text-center top-0 tracking-[-0.4492px] whitespace-nowrap">Navattic</p></div></div> }
function Text3() { return <div className="h-[30px] relative shrink-0 w-[84.203px]"><div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full"><p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] left-[42.5px] not-italic text-[20px] text-[rgba(255,255,255,0.4)] text-center top-0 tracking-[-0.4492px] whitespace-nowrap">Prepared</p></div></div> }
function Text4() { return <div className="h-[30px] relative shrink-0 w-[114.094px]"><div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full"><p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] left-[57px] not-italic text-[20px] text-[rgba(255,255,255,0.4)] text-center top-0 tracking-[-0.4492px] whitespace-nowrap">State Affairs</p></div></div> }
function Text5() { return <div className="h-[30px] relative shrink-0 w-[54.227px]"><div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full"><p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] left-[27px] not-italic text-[20px] text-[rgba(255,255,255,0.4)] text-center top-0 tracking-[-0.4492px] whitespace-nowrap">Settle</p></div></div> }
function Text6() { return <div className="h-[30px] relative shrink-0 w-[93.281px]"><div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full"><p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] left-[47px] not-italic text-[20px] text-[rgba(255,255,255,0.4)] text-center top-0 tracking-[-0.4492px] whitespace-nowrap">Nexhealth</p></div></div> }
function Text7() { return <div className="h-[30px] relative shrink-0 w-[39.859px]"><div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full"><p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] left-[20px] not-italic text-[20px] text-[rgba(255,255,255,0.4)] text-center top-0 tracking-[-0.4492px] whitespace-nowrap">Alex</p></div></div> }
function Text8() { return <div className="h-[30px] relative shrink-0 w-[66.5px]"><div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full"><p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] left-[33.5px] not-italic text-[20px] text-[rgba(255,255,255,0.4)] text-center top-0 tracking-[-0.4492px] whitespace-nowrap">Ordinal</p></div></div> }
function Text9() { return <div className="h-[30px] relative shrink-0 w-[93.617px]"><div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full"><p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] left-[47.5px] not-italic text-[20px] text-[rgba(255,255,255,0.4)] text-center top-0 tracking-[-0.4492px] whitespace-nowrap">Eduphoria</p></div></div> }

function Container() {
  return (
    <div className="h-[30px] relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[48px] items-center justify-center px-[4.648px] relative size-full">
          <Text /><Text1 /><Text2 /><Text3 /><Text4 /><Text5 /><Text6 /><Text7 /><Text8 /><Text9 />
        </div>
      </div>
    </div>
  )
}

function Logos() {
  return (
    <div className="content-stretch flex flex-col gap-[52px] items-start relative shrink-0 w-full">
      <Paragraph />
      <Container />
    </div>
  )
}

function Icon() {
  return (
    <div className="absolute left-[24px] size-[24px] top-[24px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g><path d={svgPaths.pd6d0500} stroke="var(--stroke-0, #64C6B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></g>
      </svg>
    </div>
  )
}

function Container1() {
  return (
    <div className="absolute bg-[#010219] border border-[rgba(100,198,180,0.2)] border-solid drop-shadow-[0px_20px_20px_rgba(0,0,0,0.25)] h-[166px] left-0 rounded-[8px] top-0 w-[320px]">
      <Icon />
      <div className="absolute h-[28px] left-[24px] top-[64px] w-[330px]">
        <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[18px] text-white top-0 tracking-[-0.4395px] whitespace-nowrap">Extensive Penetration Testing</p>
      </div>
      <div className="absolute h-[20px] left-[24px] top-[100px] w-[275px]">
        <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#d1d5dc] text-[14px] top-0 tracking-[-0.1504px] w-[275px]">Third-party penetration tests conducted annually.</p>
      </div>
    </div>
  )
}

function Icon1() {
  return (
    <div className="absolute left-[24px] size-[24px] top-[24px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d={svgPaths.p2dfab7c0} stroke="var(--stroke-0, #64C6B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p2c300c0} stroke="var(--stroke-0, #64C6B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  )
}

function Container2() {
  return (
    <div className="absolute bg-[#010219] border border-[rgba(100,198,180,0.2)] border-solid drop-shadow-[0px_20px_20px_rgba(0,0,0,0.25)] h-[166px] left-[384px] rounded-[8px] top-0 w-[320px]">
      <Icon1 />
      <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[24px] top-[64px] w-[276px]">
        <div className="h-[28px] relative shrink-0 w-full">
          <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[18px] text-white top-0 tracking-[-0.4395px] whitespace-nowrap">Your Data, Your Own</p>
        </div>
        <div className="h-[40px] relative shrink-0 w-full">
          <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#d1d5dc] text-[14px] top-px tracking-[-0.1504px] w-[276px]">No data is used to train Solo or any third-party models.</p>
        </div>
      </div>
    </div>
  )
}

function Icon2() {
  return (
    <div className="absolute left-[24px] size-[24px] top-[24px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d={svgPaths.pace200} stroke="var(--stroke-0, #64C6B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3d58bb40} stroke="var(--stroke-0, #64C6B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M2 12H22" stroke="var(--stroke-0, #64C6B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  )
}

function Container3() {
  return (
    <div className="absolute bg-[#010219] border border-[rgba(100,198,180,0.2)] border-solid drop-shadow-[0px_20px_20px_rgba(0,0,0,0.25)] h-[166px] left-[764px] rounded-[8px] top-0 w-[320px]">
      <Icon2 />
      <div className="absolute h-[28px] left-[24px] top-[64px] w-[330px]">
        <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[18px] text-white top-0 tracking-[-0.4395px] whitespace-nowrap">US-Based Infrastructure</p>
      </div>
      <div className="absolute h-[40px] left-[24px] top-[100px] w-[330px]">
        <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#d1d5dc] text-[14px] top-px tracking-[-0.1504px] w-[275px]">All production data is hosted in the US, backed by platforms you already trust.</p>
      </div>
    </div>
  )
}

function Frame22() {
  return (
    <div className="h-[166px] relative shrink-0 w-[1064px]">
      <Container1 /><Container2 /><Container3 />
    </div>
  )
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col gap-[120px] items-center relative shrink-0 w-full">
      <Logos />
      <Frame22 />
    </div>
  )
}

function Frame18() {
  return (
    <div className="absolute h-[8873px] left-[0.5px] top-[-634.54px] w-[1161px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1162 8873">
        <g>
          <path d="M0.5 0V8873" stroke="white" strokeDasharray="4 4" />
          <path d="M387.5 0V8873" stroke="white" strokeDasharray="4 4" />
          <path d="M774.5 0V8873" stroke="white" strokeDasharray="4 4" />
          <path d="M1161.5 0V8873" stroke="white" strokeDasharray="4 4" />
        </g>
      </svg>
    </div>
  )
}

function Frame17() {
  return (
    <div className="absolute h-[4848.638px] left-[29px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-86.5px_-841.199px] mask-size-[1315px_5790px] opacity-40 top-[1283.2px] w-[1163px]" style={{ maskImage: `url("${imgFrame67}")` }}>
      <Frame18 />
    </div>
  )
}

function Lines() {
  return (
    <div className="absolute contents left-[-57.5px] top-[442px]">
      <Frame17 />
    </div>
  )
}

function Content1() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[200px] items-center left-1/2 top-[236px] w-[1200px]">
      <H />
      <Frame21 />
      <Lines />
      <ThirdParty />
    </div>
  )
}

function Heading() {
  return (
    <div className="h-[40px] relative shrink-0 w-full">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[40px] left-[389.74px] not-italic text-[32px] text-center text-white top-0 tracking-[0.4063px] whitespace-nowrap">Third-Party Auditors, Every Year.</p>
    </div>
  )
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[128px] items-start relative shrink-0 w-[780px]">
      <Heading />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal h-[64px] leading-[32px] not-italic relative shrink-0 text-[#b4e7db] text-[20px] text-center tracking-[-0.4492px] w-full">We pride ourselves on objectivity. Once a year, Solo invites third-party auditors to review our security and policies.</p>
    </div>
  )
}

function Icon3() {
  return (
    <div className="absolute left-[33px] size-[24px] top-[33px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g><path d={svgPaths.pd6d0500} stroke="#007D73" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></g>
      </svg>
    </div>
  )
}

function Container5() {
  return (
    <div className="bg-[rgba(0,8,46,0.6)] h-[426px] relative rounded-[8px] shrink-0 w-[384px]">
      <div aria-hidden className="absolute border border-[#136665] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon3 />
      <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[33px] top-[81px] w-[318px]">
        <div className="h-[64px] relative shrink-0 w-full">
          <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] left-0 not-italic text-[24px] text-white top-0 tracking-[0.0703px] w-[318px]">Extensive Penetration Testing</p>
        </div>
        <div className="h-[168px] relative shrink-0 w-full">
          <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#b4e7db] text-[16px] top-[-0.5px] tracking-[-0.3125px] w-[318px]">On an annual basis, Solo hires a third-party to conduct a penetration test of our infrastructure. We consistently test for all levels of severity. You can find the results of the most recent test in our Trust Center.</p>
        </div>
      </div>
    </div>
  )
}

function Icon4() {
  return (
    <div className="absolute left-[33px] size-[24px] top-[33px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d={svgPaths.pb47f400} stroke="#007D73" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p17a13100} stroke="#007D73" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M9 15L11 17L15 13" stroke="#007D73" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  )
}

function Container6() {
  return (
    <div className="bg-[rgba(0,8,46,0.6)] h-[426px] relative rounded-[8px] shrink-0 w-[384px]">
      <div aria-hidden className="absolute border border-[#136665] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon4 />
      <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[33px] top-[81px] w-[318px]">
        <div className="h-[32px] relative shrink-0 w-full">
          <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] left-0 not-italic text-[24px] text-white top-0 tracking-[0.0703px] whitespace-nowrap">SOC 2 Type II</p>
        </div>
        <div className="h-[120px] relative shrink-0 w-full">
          <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#b4e7db] text-[16px] top-[-0.5px] tracking-[-0.3125px] w-[318px]">{`Solo adheres to the AICPA's SOC 2 Type II standards and, on an annual basis, is reviewed by a third-party auditor in partnership with Vanta. The certification results can be found in our Trust Center.`}</p>
        </div>
        <div className="relative shrink-0 size-[109px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover opacity-80 pointer-events-none size-full" src={SOC2_LOGO} />
        </div>
      </div>
    </div>
  )
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[40px] items-center relative shrink-0 w-full">
      <Container5 />
      <Container6 />
    </div>
  )
}

function ThirdParty() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-center relative shrink-0 w-[808px]">
      <Container4 />
      <Frame5 />
    </div>
  )
}

function Frame7() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col items-center left-[calc(50%+15px)] px-[52px] rounded-[8px] top-[3061px] w-[1440px]">
      <div className="content-stretch flex flex-col gap-[120px] items-center justify-center relative shrink-0">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-center not-italic relative shrink-0 text-center">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[40px] relative shrink-0 text-[32px] text-white tracking-[0.4063px] whitespace-nowrap">Security Practices</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal h-[64px] leading-[32px] relative shrink-0 text-[#b4e7db] text-[24px] w-[753px]">{` We believe that access should always be approved, and your data is not there to train our models.`}</p>
        </div>
        <div className="content-stretch flex flex-col gap-[66px] items-start relative shrink-0">
          <div className="content-stretch flex gap-[66px] items-center relative shrink-0">
            <SecurityItem iconPaths={[svgPaths.p22bef200]} title="Model Usage" body="We use Google Gemini and, in some cases, allow enterprise customers to bring their own models." />
            <SecurityItem iconPaths={[svgPaths.pd6d0500]} title="Preventing Model Training" body="Customer data is not used to train Solo or any third-party models, including all code, metadata, questions, and Slack interactions." />
            <SecurityItem iconPaths={[svgPaths.p51c6380, svgPaths.pff86670]} title="Access & Permissions" body="Solo is designed to follow standard enterprise practices, including limiting access and following the principle of least privilege." />
          </div>
          <div className="content-stretch flex gap-[66px] items-start relative shrink-0">
            <SecurityItem iconPaths={[svgPaths.p1d820380, svgPaths.p161d4800, svgPaths.p290131c0, svgPaths.p1fe9dd00]} title="SSO & Identity Management" body={`Solo supports Google authentication and allows users to log in through their organization's Google accounts. We leverage Google's secure SSO framework.`} />
            <SecurityItem iconPaths={[svgPaths.p2a7857e0]} title="GitHub OAuth" body="We authenticate with GitHub OAuth, so Solo can only read code and repository metadata to generate product knowledge. It cannot make commits, open pull requests, or modify your code." />
            <SecurityItem iconPaths={[svgPaths.p3c61fe80]} title="Slack" body="Solo operates only in Slack channels or direct messages approved by your administrators, and interactions are limited to users in those channels." />
          </div>
          <SecurityItem iconPaths={[svgPaths.p38ffec00, svgPaths.p3cccb600]} title="Admin Portal" body="Solo provides an implementation admin who, through their configuration portal, can configure granular roles and permissions that dictate what user actions are allowed." />
        </div>
      </div>
    </div>
  )
}

function SecurityItem({ iconPaths, title, body }: { iconPaths: string[]; title: string; body: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[320px]">
      <div className="relative shrink-0 size-[24px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g>{iconPaths.map((d, i) => <path key={i} d={d} stroke="#007D73" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />)}</g>
        </svg>
      </div>
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] min-w-full not-italic relative shrink-0 text-[24px] text-white tracking-[0.0703px] w-[min-content]">{title}</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-w-full not-italic relative shrink-0 text-[#b4e7db] text-[16px] tracking-[-0.3125px] w-[min-content]">{body}</p>
    </div>
  )
}

function Frame25() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[54px] items-start left-[163px] top-[2170px]">
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start not-italic relative shrink-0">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[48.3px] relative shrink-0 text-[42px] text-white tracking-[0.3691px] w-[610px] whitespace-pre-wrap">{`Your data should always      be yours.`}</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[32px] relative shrink-0 text-[#b4e7db] text-[24px] w-[474px]">Solo is built on the idea that your data belongs to you and not to anyone else.</p>
      </div>
      <div className="content-stretch flex gap-[78px] items-start relative shrink-0">
        <AccessLogCard />
        <div className="content-stretch flex flex-col gap-[52px] items-start justify-center relative shrink-0">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-[474px]">
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start leading-[32px] not-italic relative shrink-0 text-[24px] w-full">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-white tracking-[0.0703px] w-full">US-Based Infrastructure</p>
              <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#b4e7db] tracking-[-0.3125px] w-full">All data storage is located in the United States, with production and data services hosted on Heroku and Pinecone.</p>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-start opacity-40 relative shrink-0 w-[474px]">
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start leading-[32px] not-italic relative shrink-0 text-[24px] w-full">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-white tracking-[0.0703px] w-full">Encryption</p>
              <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#b4e7db] tracking-[-0.3125px] w-full">Solo uses AES-GCM encryption via Rails Active Record Encryption to provide authenticated encryption and ensure the confidentiality and integrity of your data.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AccessLogCard() {
  const rows = [
    { ts: 'Apr 14, 2026 · 09:42 UTC', action: 'Data read' },
    { ts: 'Apr 13, 2026 · 14:17 UTC', action: 'Data read' },
    { ts: 'Apr 12, 2026 · 11:03 UTC', action: 'Encryption verified' },
    { ts: 'Apr 11, 2026 · 08:55 UTC', action: 'Data read' },
    { ts: 'Apr 10, 2026 · 16:44 UTC', action: 'Access audit' },
  ]
  return (
    <div className="bg-[#0a1628] h-[428px] relative rounded-[14px] shrink-0 w-[568.195px]">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        {/* Header */}
        <div className="h-[53px] relative shrink-0 w-full">
          <div aria-hidden className="absolute border-[rgba(100,198,180,0.15)] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center justify-between pb-[17px] pt-[16px] px-[24px] relative size-full">
              <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[14px] text-white tracking-[-0.1504px] whitespace-nowrap">Access Log · Last 30 days</p>
              <div className="flex gap-[8px] items-center">
                <div className="bg-[#00c950] relative rounded-[16777200px] shrink-0 size-[8px]" />
                <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic text-[#d2d2d2] text-[12px] whitespace-nowrap">All clear</p>
              </div>
            </div>
          </div>
        </div>
        {/* Rows */}
        <div className="h-[316px] relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start pt-[16px] px-[24px] relative size-full">
            {rows.map((row, i) => (
              <div key={i} className={`${i < 4 ? 'h-[57px]' : 'h-[56px]'} relative shrink-0 w-full`}>
                {i < 4 && <div aria-hidden className="absolute border-[rgba(100,198,180,0.1)] border-b border-solid inset-0 pointer-events-none" />}
                <p className="[word-break:break-word] absolute font-['Menlo:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#686868] text-[12px] top-[12px] w-[163px]">{row.ts}</p>
                <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-[178.06px] not-italic text-[13px] text-white top-[13px] tracking-[-0.0762px] whitespace-nowrap">{row.action}</p>
                <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[356.13px] not-italic text-[#64c6b4] text-[12px] top-[13px] whitespace-nowrap">Your Organization</p>
              </div>
            ))}
          </div>
        </div>
        {/* Footer */}
        <div className="h-[57px] relative shrink-0 w-full">
          <div aria-hidden className="absolute border-[rgba(100,198,180,0.15)] border-solid border-t inset-0 pointer-events-none" />
          <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-[283.75px] not-italic text-[#6a7282] text-[11px] text-center top-[23.5px] tracking-[0.0645px] whitespace-nowrap">No unauthorized access attempts detected.</p>
        </div>
      </div>
      <div aria-hidden className="absolute border border-[rgba(100,198,180,0.2)] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  )
}

function HeroSectionBuild() {
  const faqRows = [
    'How does Solo AI protect my data?',
    'Is my code used to train AI models?',
    'What compliance standards does Solo meet?',
    'Can I delete my data?',
    'How does Solo handle security incidents?',
    "Where is Solo's data hosted?",
  ]
  return (
    <div className="absolute bg-[#010219] content-stretch flex flex-col h-[720px] items-start left-px top-[4168px] w-[1440px]">
      <div className="content-stretch flex flex-col h-[862px] items-start relative shrink-0 w-full">
        <div className="bg-[rgba(0,8,50,0)] h-[865px] relative shrink-0 w-full">
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex items-center justify-center p-[64px] relative size-full">
              <div className="h-full relative shrink-0 w-[875px]">
                <div className="absolute content-stretch flex flex-col h-[569px] items-start left-0 top-0 w-[276.695px]">
                  <div className="h-[184.781px] relative shrink-0 w-full">
                    <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[61.6px] left-[-129.5px] not-italic text-[56px] text-white top-0 tracking-[0.3008px] w-[528px]">Frequently asked questions</p>
                  </div>
                </div>
                <div className="absolute content-stretch flex flex-col h-[569px] items-start left-[468.5px] top-0 w-[526px]">
                  {faqRows.map((q, i) => (
                    <div key={i} className={`${i < 5 ? 'h-[95px]' : 'h-[94px]'} relative shrink-0 w-full`}>
                      {i < 5 && <div aria-hidden className="absolute border-[rgba(180,231,219,0.2)] border-b border-solid inset-0 pointer-events-none" />}
                      <div className="content-stretch flex items-center justify-between py-[32px] relative size-full">
                        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[30px] not-italic text-[20px] text-white tracking-[-0.4492px] whitespace-nowrap">{q}</p>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M6 9L12 15L18 9" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Content() {
  return (
    <div className="h-[6883px] overflow-clip relative shrink-0 w-full" style={{ backgroundImage: "linear-gradient(rgba(100, 198, 180, 0.08) 0.10785%, rgba(0, 0, 0, 0) 0.10785%), linear-gradient(90deg, rgba(100, 198, 180, 0.08) 0%, rgba(0, 0, 0, 0) 0%), linear-gradient(rgb(0, 2, 24) 0%, rgb(0, 5, 32) 16.827%, rgb(0, 8, 50) 62.981%)" }}>
      <Content1 />
      <Frame7 />
      <Frame25 />
      <HeroSectionBuild />
    </div>
  )
}

function Grid() {
  return (
    <div className="-translate-x-1/2 absolute h-[1067px] left-[calc(50%-1.5px)] top-[64px] w-[1443px]">
      <div className="absolute flex h-[956px] items-center justify-center left-[3px] top-0 w-[1440px]">
        <div className="flex-none rotate-180">
          <div className="h-[956px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[1440px_960px] relative w-[1440px]" style={{ backgroundImage: "linear-gradient(-0.138228deg, rgb(255, 255, 255) 0.26977%, rgba(255, 255, 255, 0.365) 61.685%, rgba(255, 255, 255, 0) 105.86%)", maskImage: `url("${imgRectangle13}")` }} />
        </div>
      </div>
    </div>
  )
}

function SoloAiPage() {
  return (
    <div className="content-stretch flex flex-col items-center overflow-clip relative rounded-[6px] size-full">
      <div className="bg-white content-stretch flex flex-col items-center relative shrink-0 w-full">
        <div className="aspect-[1463/65] relative shrink-0 w-full">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[104.62%] left-0 max-w-none top-[-4.62%] w-full" src={NAV_IMG} />
          </div>
        </div>
        <Content />
      </div>
      <div className="-translate-x-1/2 absolute contents left-[calc(50%-1.5px)] top-[64px]">
        <Grid />
      </div>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function SoloAiScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cameraRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  // Scale the 1440×900 frame to fill the available container
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      if (width > 0 && height > 0) {
        setScale(Math.min(width / FRAME_W, height / FRAME_H))
      }
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Scroll animation — pause → scroll down → pause → scroll up → repeat
  useLayoutEffect(() => {
    const camera = cameraRef.current
    if (!camera) return

    const viewportH = FRAME_H - CHROME_H - SOLOAI_NAV_H
    const minOff = SOLOAI_NAV_H
    const maxOff = SOLOAI_NAV_H + FAQ_END_IN_CONTENT - viewportH

    camera.style.transform = `translateY(${-minOff}px)`

    type Phase = 'pause-top' | 'down' | 'pause-bottom' | 'up'
    let phase: Phase = 'pause-top'
    let phaseStart = 0
    let offset = minOff
    let raf: number

    function tick(ts: number) {
      if (!camera) return
      if (!phaseStart) phaseStart = ts
      const dt = ts - phaseStart
      const range = maxOff - minOff

      switch (phase) {
        case 'pause-top':
          if (dt >= PAUSE_MS) { phase = 'down'; phaseStart = ts }
          break
        case 'down': {
          const t = Math.min(dt / DOWN_MS, 1)
          offset = minOff + ease(t) * range
          camera.style.transform = `translateY(${-offset}px)`
          if (t >= 1) { phase = 'pause-bottom'; phaseStart = ts }
          break
        }
        case 'pause-bottom':
          if (dt >= PAUSE_MS) { phase = 'up'; phaseStart = ts }
          break
        case 'up': {
          const t = Math.min(dt / UP_MS, 1)
          offset = maxOff - ease(t) * range
          camera.style.transform = `translateY(${-offset}px)`
          if (t >= 1) { phase = 'pause-top'; phaseStart = ts }
          break
        }
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* Fix Figma-exported font family strings so Inter & Menlo actually resolve */}
      <style>{`
        [class*="Inter"]  { font-family: Inter, -apple-system, sans-serif !important; }
        [class*="Menlo"]  { font-family: Menlo, "SF Mono", "Courier New", monospace !important; }
      `}</style>

      {/* 1440×900 browser window, CSS-scaled to fit container */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: FRAME_W,
        height: FRAME_H,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: 'center center',
        flexShrink: 0,
        borderRadius: CHROME_R,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0px 32.347px 97.04px 0px rgba(0,0,0,0.45)',
      }}>
        <BrowserChrome />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
          {/* Sticky nav image */}
          <div style={{ flexShrink: 0, lineHeight: 0, fontSize: 0 }}>
            <img
              src={NAV_IMG}
              alt=""
              style={{ width: '100%', display: 'block', verticalAlign: 'top', marginTop: -4 }}
              draggable={false}
            />
          </div>

          {/* Overflow-hidden viewport — camera animates via translateY */}
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative', minHeight: 0 }}>
            <div
              ref={cameraRef}
              style={{
                width: FRAME_W,
                height: 5200,
                position: 'absolute',
                top: 0,
                left: 0,
                willChange: 'transform',
              }}
            >
              <SoloAiPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
