"use client";

import Script from "next/script";

export default function AdsterraBanner() {
  return (
    <div>
      {/* Adsterra configuration */}
      <Script id="adsterra-options" strategy="beforeInteractive">
        {`
          atOptions = {
            'key' : '7b0aab42391312cc097bd4aba378a0dc',
            'format' : 'iframe',
            'height' : 60,
            'width' : 468,
            'params' : {}
          };
        `}
      </Script>

      {/* Adsterra script */}
      <Script
        src="//www.highperformanceformat.com/7b0aab42391312cc097bd4aba378a0dc/invoke.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
{
  /* <script type="text/javascript">
	atOptions = {
		'key' : '7b0aab42391312cc097bd4aba378a0dc',
		'format' : 'iframe',
		'height' : 60,
		'width' : 468,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/7b0aab42391312cc097bd4aba378a0dc/invoke.js"></script> */
}
