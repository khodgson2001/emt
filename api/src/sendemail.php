<?php
/*
 * Send email using Mailgun
 * Code from https://gist.github.com/swapnilshrikhande/d4c315b4a9590f4f91baba43a793f734
 * Adapted by Kieran Hodgson for use in EMT App
 * 
 * @description This endpoint is used to send emails via the mailgun API using a cUrl request
 */
class SendEmail extends Endpoint
{

	public function __construct()
	{
		$this->validateToken();
		$to = $_POST['to']; // params needed for mailgun
		$toname = $_POST['toname'];
		$mailfromname = 'EMT Application';
		$mailfrom = 'noreply@khodg.tech';
		$subject = $_POST['subject'];
		$html = $_POST['html'];
		$text = $_POST['text'];
		$tag = $_POST['tag'];
		$replyto = $_POST['replyto'];
		$array_data = array( // formatting data for mailgun
			'from' => $mailfromname . '<' . $mailfrom . '>',
			'to' => $toname . '<' . $to . '>',
			'subject' => $subject,
			'html' => $html,
			'text' => $text,
			'o:tracking' => 'yes',
			'o:tracking-clicks' => 'yes',
			'o:tracking-opens' => 'yes',
			'o:tag' => $tag,
			'h:Reply-To' => $replyto
		);

		$session = curl_init(MAILGUN_URL . '/messages'); //initiate the curl session with the mailgun url
		curl_setopt($session, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		curl_setopt($session, CURLOPT_USERPWD, 'api:' . MAILGUN_KEY);
		curl_setopt($session, CURLOPT_POST, true);
		curl_setopt($session, CURLOPT_POSTFIELDS, $array_data);
		curl_setopt($session, CURLOPT_HEADER, false);
		curl_setopt($session, CURLOPT_ENCODING, 'UTF-8');
		curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($session, CURLOPT_SSL_VERIFYPEER, false);
		$response = curl_exec($session);
		curl_close($session);
		$results = json_decode($response, true);

		$this->setContent(
			[
				'success' => true,
				'results' => $results
			]
		);
	}
}