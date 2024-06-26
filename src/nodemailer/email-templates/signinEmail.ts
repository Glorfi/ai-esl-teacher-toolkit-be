export function signinEmailHTML(link: string, token: string) {
  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="x-apple-disable-message-reformatting">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Login token for ESL Teacher Toolkit</title>
	<style type="text/css">
		html {
			-webkit-text-size-adjust: none;
			-ms-text-size-adjust: none;
		}
	</style>
	<style em="styles">
@media only screen and (max-device-width:660px),only screen and (max-width:660px) {
    .em-narrow-table {
        width: 100%!important;
        max-width: 660px!important;
        min-width: 320px!important;
    }
    .em-mob-width-100perc {
        width: 100%!important;
        max-width: 100%!important;
    }
    .em-mob-wrap {
        display: block!important;
    }
    .em-mob-padding_right-20 {
        padding-right: 20px!important;
    }
    .em-mob-padding_left-20 {
        padding-left: 20px!important;
    }
}
</style>
	<!--[if gte mso 9]>
	<xml>
		<o:OfficeDocumentSettings>
		<o:AllowPNG></o:AllowPNG>
		<o:PixelsPerInch>96</o:PixelsPerInch>
		</o:OfficeDocumentSettings>
	</xml>
	<![endif]-->
</head>

<body style="margin: 0; padding: 0; background-color: #F8F8F8;">
	<span class="preheader" style="display: none !important; visibility: hidden; opacity: 0; color: #F8F8F8; height: 0; width: 0; font-size: 1px;">Welcome back!&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌</span>
	<!--[if !mso]><!-->
	<div style="font-size:0px;color:transparent;opacity:0;">
		⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
	</div>
	<!--<![endif]-->
	<table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size: 1px; line-height: normal;" bgcolor="#F8F8F8">
		<tr em="group">
			<td align="center" style="background-repeat: repeat;">
				<!--[if (gte mso 9)|(IE)]>
				<table cellpadding="0" cellspacing="0" border="0" width="660"><tr><td>
				<![endif]-->
				<table cellpadding="0" cellspacing="0" width="100%" border="0" style="max-width: 660px; min-width: 660px; width: 660px;" class="em-narrow-table"><tr em="block" class="em-structure">
                                    <td align="center" style="padding: 54px 40px 14px; background-color: #ffffff; background-repeat: repeat;" class="em-mob-padding_left-20 em-mob-padding_right-20" bgcolor="#ffffff">
                                        <table align="center" border="0" cellspacing="0" cellpadding="0" class="em-mob-width-100perc">
                                            <tr>
                                                <td width="580" valign="top" class="em-mob-wrap em-mob-width-100perc">
                                                    <table cellpadding="0" cellspacing="0" border="0" width="100%" em="atom"><tr><td align="center">
  <img src="https://emcdn.ru/285813/240626_4286_jfIcCe2.png" width="40" border="0" alt="logo" style="display: block; width: 100%; max-width: 40px;">
</td></tr></table>
<table cellpadding="0" cellspacing="0" border="0" width="100%" em="atom"><tr><td style="padding-top: 12px; padding-right: 0px; padding-left: 0px;">
  <div style="font-family: -apple-system, 'Segoe UI', 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; font-size: 32px; line-height: 32px; color: #1d345a" align="center"><strong>Login token for ESL Teacher Toolkit</strong></div>
</td></tr></table>
<table cellpadding="0" cellspacing="0" border="0" width="100%" em="atom"><tr><td style="padding: 24px 0px 34px;" align="center">
  <table cellpadding="0" cellspacing="0" border="0" width="300">
    <tr>
      <td align="center" valign="middle" height="40" style="background-color: #1d345a; border-radius: 5px; height: 40px;" bgcolor="#1d345a">
        <a style="display: block; height: 40px; font-family: -apple-system, 'Segoe UI', 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; color: #ffffff; font-size: 16px; line-height: 40px; text-decoration: none; white-space: nowrap;" target="_blank" href="${link}"><span style="line-height: 40px; font-weight: bold;">Login to ESL Teacher Toolkit&nbsp;</span></a>
      </td>
    </tr></table>
</td></tr></table>
<table cellpadding="0" cellspacing="0" border="0" width="100%" em="atom"><tr><td style="padding-bottom: 1px;">
  <div style="font-family: -apple-system, 'Segoe UI', 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; line-height: 21px; color: #1d345a; font-size: 14px;" align="center">This link and token will only be valid for the next 5 minutes. If the link does not work, you can use this token directly:</div>
</td></tr></table>



                                                </td>
                                            </tr></table>
                                    </td>
                                </tr><tr em="block" class="em-structure">
                                    <td align="center" style="padding-right: 40px; padding-bottom: 44px; padding-left: 40px; background-color: #ffffff; background-repeat: repeat;" class="em-mob-padding_left-20 em-mob-padding_right-20" bgcolor="#ffffff">
                                        <table align="center" border="0" cellspacing="0" cellpadding="0" class="em-mob-width-100perc">
                                            <tr>
                                                <td width="580" valign="top" class="em-mob-wrap em-mob-width-100perc">
                                                    <table cellpadding="0" cellspacing="0" border="0" width="100%" em="atom"><tr><td style="padding-right: 0px; padding-left: 0px; height: 24px;" align="center" height="24">
  <table cellpadding="0" cellspacing="0" border="0" width="61" style="width: 61px;">
    <tr>
      <td align="center" valign="middle" height="24" style="background-color: #e2e8f0; border-radius: 5px; height: 24px;" bgcolor="#E2E8F0">
        <a href="" target="_blank" style="display: block; height: 24px; font-family: -apple-system, 'Segoe UI', 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; font-size: 14px; line-height: 24px; text-decoration: none; white-space: nowrap; color: #8c8c8c;"><span style="font-weight: bold;">
          ${token}
        </span></a>
      </td>
    </tr></table>
</td></tr></table>
                                                </td>
                                            </tr></table>
                                    </td>
</tr><tr em="block" class="em-structure">
                                    <td align="center" style="padding: 13px 40px 54px; border-width: 2px 6px 6px; border-top-color: #e2e8f0; border-top-style: solid; background-color: #ffffff; background-repeat: repeat;" class="em-mob-padding_left-20 em-mob-padding_right-20" bgcolor="#ffffff">
                                        <table align="center" border="0" cellspacing="0" cellpadding="0" class="em-mob-width-100perc">
                                            <tr>
                                                <td width="580" valign="top" class="em-mob-wrap em-mob-width-100perc">
                                                    <table cellpadding="0" cellspacing="0" border="0" width="100%" em="atom"><tr><td>
  <div style="font-family: -apple-system, 'Segoe UI', 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; font-size: 14px; line-height: 21px; color: #8c8c8c;" align="center">ESL Teacher ToolKit is your AI assistant for creating exercises</div>
</td></tr></table>
                                                </td>
                                            </tr></table>
                                    </td>
</tr></table>
				<!--[if (gte mso 9)|(IE)]>
				</td></tr></table>
				<![endif]-->
			</td>
		</tr>
	</table>
</body>

</html>`;
  return html;
}
