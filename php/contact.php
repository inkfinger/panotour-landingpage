<?php

require( 'class.phpmailer.php' );
require( 'class.smtp.php' );


$receiverMail = 'sports@berlinproof.de';
$receiverName = 'Berlinproof';
$logFile = __DIR__.'/contact.log';
$delay = 0;

/* Check if log is writable */
if( !is_writable( $logFile ) )
    die( 'Contact log file is not writable!' );

/* Parse log into Array ($log) and clean expired entries*/
$log = array_filter( array_map( function( $line ) {

    $line = trim( $line );

    if( empty( $line ) )
        return;

    list( $time, $ip ) = explode( ' ', $line );

    $time = intval( $time );

    return (object)compact( 'time', 'ip' );
}, file( $logFile ) ), function( $item ) use( $delay ) {

    return time() - $item->time < $delay;
} );


function addLog( &$log ) {

    $log[] = (object)array(
        'time' => time(),
        'ip' => $_SERVER[ 'REMOTE_ADDR' ]
    );
}

function hasLog( $log ) {

    foreach( $log as $item )
        if( $item->ip == $_SERVER[ 'REMOTE_ADDR' ] )
            return true;

    return false;
}

function saveLog( $log, $logFile ) {

    $fp = fopen( $logFile, 'w' );

    foreach( $log as $item )
        fwrite( $fp, "$item->time $item->ip\n" );

    fclose( $fp );
}


if( strtolower( $_SERVER[ 'REQUEST_METHOD' ] ) == 'post' ) {

    // unternehmen
    $unternehmen = empty( $_REQUEST[ 'unternehmen' ] )
          ? ''
          : $_REQUEST[ 'unternehmen' ];

    // vorname
    $vorname = empty( $_REQUEST[ 'vorname' ] )
          ? ''
          : $_REQUEST[ 'vorname' ];

    // nachname
    $nachname = empty( $_REQUEST[ 'nachname' ] )
          ? ''
          : $_REQUEST[ 'nachname' ];

    // strasse
    $strasse = empty( $_REQUEST[ 'strasse' ] )
          ? ''
          : $_REQUEST[ 'strasse' ];

    // plzort
    $plzort = empty( $_REQUEST[ 'plzort' ] )
          ? ''
          : $_REQUEST[ 'plzort' ];

    // land
    $land = empty( $_REQUEST[ 'land' ] )
          ? ''
          : $_REQUEST[ 'land' ];

    // tel
    $tel = empty( $_REQUEST[ 'tel' ] )
          ? ''
          : $_REQUEST[ 'tel' ];

    // fax
    $fax = empty( $_REQUEST[ 'fax' ] )
          ? ''
          : $_REQUEST[ 'fax' ];

    // email
    $email = empty( $_REQUEST[ 'email' ] )
          ? ''
          : $_REQUEST[ 'email' ];

    // web
    $web = empty( $_REQUEST[ 'web' ] )
          ? ''
          : $_REQUEST[ 'web' ];

    // rueckruf
    $rueckruf = empty( $_REQUEST[ 'rueckruf' ] )
          ? ''
          : $_REQUEST[ 'rueckruf' ];

    // wunschtermin
    $wunschtermin = empty( $_REQUEST[ 'wunschtermin' ] )
          ? ''
          : $_REQUEST[ 'wunschtermin' ];

    // wunschtermin
    $bestellen = empty( $_REQUEST[ 'bestellen' ] )
          ? ''
          : $_REQUEST[ 'bestellen' ];

    // angebot
    $angebot = empty( $_REQUEST[ 'angebot' ] )
          ? ''
          : $_REQUEST[ 'angebot' ];

    // rueckDate
    $rueckDate = empty( $_REQUEST[ 'rueckDate' ] )
          ? ''
          : $_REQUEST[ 'rueckDate' ];

    // rueckZeit
    $rueckZeit = empty( $_REQUEST[ 'rueckZeit' ] )
          ? ''
          : $_REQUEST[ 'rueckZeit' ];

    // terminDate
    $terminDate = empty( $_REQUEST[ 'terminDate' ] )
          ? ''
          : $_REQUEST[ 'terminDate' ];

    // terminZeit
    $terminZeit = empty( $_REQUEST[ 'terminZeit' ] )
          ? ''
          : $_REQUEST[ 'terminZeit' ];

    date_default_timezone_set("Europe/Berlin");
    $timestamp = time();
    $datum = date("d.m.Y",$timestamp);
    $uhrzeit = date("H:i",$timestamp);

    $wantTermin = "";

    if( $wunschtermin ) {
      $wantTermin = "Der Wunschtermin des Kunden ist am $terminDate gegen $terminZeit." ;
    } else {
      $wantTermin =  "Der Kunde hat keinen Wunschtermin.";
    }

    $wantRueck = "";

    if( $rueckruf ) {
      $wantRueck = "Der Kunde möchte zum $rueckDate gegen $rueckZeit zurückgerufen werden. ";
    } else {
      $wantRueck = "Der Kunde möchte nicht zurückgerufen werden.";
    }

    $wantAngebot = "";

    if( $wantAngebot ) {
      $wantAngebot = "Der Kunde wünscht ein Angebot.";
    } else {
      $wantAngebot = "Der Kunde wünscht kein Angebot.";
    }

    if( hasLog( $log ) ) {

        if( !empty( $return ) ) {

            header( 'Location: '.$return.'?alreadySent#'.$fragment );
        }
        exit;
    }

    $mail = new PHPMailer();

    $mail->IsSMTP();
    $mail->Host     = "smtp.strato.de";
    $mail->SMTPAuth = true;
    $mail->Username = "trusted@berlinproof.de";
    $mail->Password = "Pk1mnIri!";
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    $mail->CharSet = 'utf-8';

    $mail->From     = "trusted@berlinproof.de";
    $mail->FromName = "Berlinproof GmbH";
    $mail->AddAddress( $receiverMail, $receiverName );
    $mail->AddReplyTo( $email, ( $vorname . " " . $nachname ) );


    $mail->WordWrap = 100;
    $mail->Subject  =  "[ $datum | $uhrzeit ] ANFRAGE Google Street View | Trusted";
    $mail->Body     =  "Google Street View | Trusted Anfrage

    Folgende Informationen wurden vom Kunden übermittelt:

    Unternehmen: $unternehmen
    Vorname: $vorname
    Nachname: $nachname
    Straße: $strasse
    PLZ / Ort: $plzort
    Land: $land
    Telefon: $tel
    Fax: $fax
    Mail: $email
    Web: $web

    Rückruf: $wantRueck
    Wunschtermin: $wantTermin

    ---
    Die Anfrage wurde am $datum um $uhrzeit erstellt.";


    $mail->Send();

    $mail = new PHPMailer();

    $mail->IsSMTP();
    $mail->Host     = "smtp.strato.de";
    $mail->SMTPAuth = true;
    $mail->Username = "trusted@berlinproof.de";
    $mail->Password = "Pk1mnIri!";
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    $mail->CharSet = 'utf-8';

    $mail->From     = "trusted@berlinproof.de";
    $mail->FromName = "Berlinproof GmbH";
    $mail->AddAddress( $email, $vorname . " " . $nachname );
    $mail->AddReplyTo( "info@berlinproof.com", ( $receiverName ) );


    $mail->WordWrap = 100;
    $mail->Subject  =  "[ $datum | $uhrzeit ] ANFRAGE Google Street View | Trusted";
    $mail->Body     =  "Google Street View | Trusted Bestellung

    Sehr geehrte Damen und Herren,

    wir bedanken uns für Ihre Anfrage bezüglich eines Google Street View | Trusted Fotoshootings für Ihr Hotel.

    Einer unserer Vertriebsmitarbeiter wird sich in Kürze bei Ihnen melden.";


    $mail->Send();

    addLog( $log );
    saveLog( $log, $logFile );

    if( !empty( $return ) ) {

        header( 'Location: '.$return.'?sentContact#'.$fragment );
    }
}
