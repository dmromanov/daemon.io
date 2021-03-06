### generic # Generic #> Generic {tpl-git PHPDaemon/HTTPRequest/Generic.php}

```php
namespace PHPDaemon\HTTPRequest;
abstract class Generic extends \PHPDaemon\Request\Generic;
```

@TODO

<!-- include-namespace path="\PHPDaemon\HTTPRequest\Generic" level="" access="" -->
#### properties # Properties

<md:prop>
/**
	 * @var boolean Keepalive?
	 */
public $keepalive = false
</md:prop>

<md:prop>
/**
	 * @var integer Current response length
	 */
public $responseLength = 0
</md:prop>

<md:prop>
/**
	 * @var array Replacement pairs for processing some header values in parse_str()
	 */
public static $hvaltr = [
  '; ' => '&',
  ';' => '&',
  ' ' => '%20',
]
</md:prop>

<md:prop>
/**
	 * @var array State
	 */
public static $htr = [
  '-' => '_',
]
</md:prop>

<div class="clearboth"></div>

#### methods # Methods

<md:method>
/**
	 * Called when first deferred event used
	 * @return void
	 */
public function firstDeferredEventUsed ()
link:https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/HTTPRequest/Generic.php#L167
</md:method>

<md:method>
/**
	 * Output whole contents of file
	 * @param  string   $path Path
	 * @param  callable $cb   Callback
	 * @param  integer  $pri  Priority
	 * @return boolean        Success
	 */
public function sendfile($path, $cb, $pri = EIO_PRI_DEFAULT)
link:https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/HTTPRequest/Generic.php#L178
</md:method>

<md:method>
/**
	 * Called to check if Request is ready
	 * @return boolean Ready?
	 */
public function checkIfReady()
link:https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/HTTPRequest/Generic.php#L248
</md:method>

<md:method>
/**
	 * Upload maximum file size
	 * @return integer
	 */
public function getUploadMaxSize()
link:https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/HTTPRequest/Generic.php#L274
</md:method>

<md:method>
/**
	 * Prepares the request body
	 * @return void
	 */
public function postPrepare()
link:https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/HTTPRequest/Generic.php#L356
</md:method>

<md:method>
/**
	 * Ensure that headers are sent
	 * @return boolean Were already sent?
	 */
public function ensureSentHeaders()
link:https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/HTTPRequest/Generic.php#L418
</md:method>

<md:method>
/**
	 * Output some data
	 * @param  string  $s     String to out
	 * @param  boolean $flush ob_flush?
	 * @return boolean        Success
	 */
public function out($s, $flush = true)
link:https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/HTTPRequest/Generic.php#L469
</md:method>

<md:method>
/**
	 * Called when request's headers parsed
	 * @return void
	 */
public function onParsedParams()
link:https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/HTTPRequest/Generic.php#L526
</md:method>

<md:method>
/**
	 * Outputs data with headers (split by \r\n\r\n)
	 * @param  string  $s Data
	 * @return boolean    Success
	 */
public function combinedOut($s)
link:https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/HTTPRequest/Generic.php#L534
</md:method>

<md:method>
/**
	 * Use chunked encoding
	 * @return void
	 */
public function chunked()
link:https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/HTTPRequest/Generic.php#L558
</md:method>

<md:method>
/**
	 * Called when the request wakes up
	 * @return void
	 */
public function onWakeup()
link:https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/HTTPRequest/Generic.php#L567
</md:method>

<md:method>
/**
	 * Called when the request starts sleep
	 * @return void
	 */
public function onSleep()
link:https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/HTTPRequest/Generic.php#L585
</md:method>

<md:method>
/**
	 * Send HTTP-status
	 * @param  integer $code Code
	 * @throws RequestHeadersAlreadySent
	 * @return boolean Success
	 */
public function status($code = 200)
link:https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/HTTPRequest/Generic.php#L605
</md:method>

<md:method>
/**
	 * Checks if headers have been sent
	 * @param  string  &$file File name
	 * @param  integer &$line Line in file
	 * @return boolean        Success
	 */
public function headers_sent(&$file, &$line)
link:https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/HTTPRequest/Generic.php#L619
</md:method>

<md:method>
/**
	 * Return current list of headers
	 * @return array Headers
	 */
public function headers_list()
link:https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/HTTPRequest/Generic.php#L629
</md:method>

<md:method>
/**
	 * Set the cookie
	 * @param string  $name     Name of cookie
	 * @param string  $value    Value
	 * @param integer $maxage   Optional. Max-Age. Default is 0
	 * @param string  $path     Optional. Path. Default is empty string
	 * @param string  $domain   Optional. Domain. Default is empty string
	 * @param boolean $secure   Optional. Secure. Default is false
	 * @param boolean $HTTPOnly Optional. HTTPOnly. Default is false
	 * @return void
	 */
public function setcookie($name, $value = '', $maxage = 0, $path = '', $domain = '', $secure = false, $HTTPOnly = false)
link:https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/HTTPRequest/Generic.php#L644
</md:method>

<md:method>
/**
	 * Send the header
	 * @param  string  $s       Header. Example: 'Location: http://php.net/'
	 * @param  boolean $replace Optional. Replace?
	 * @param  integer $code    Optional. HTTP response code
	 * @throws \PHPDaemon\Request\RequestHeadersAlreadySent
	 * @return boolean Success
	 */
public function header($s, $replace = true, $code = false)
link:https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/HTTPRequest/Generic.php#L662
</md:method>

<md:method>
/**
	 * Removes a header
	 * @param  string $s Header name. Example: 'Location'
	 * @return void
	 */
public function removeHeader($s)
link:https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/HTTPRequest/Generic.php#L726
</md:method>

<md:method>
/**
	 * Converts human-readable representation of size to number of bytes
	 * @param  string $value String of size
	 * @return integer
	 */
public static function parseSize($value)
link:https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/HTTPRequest/Generic.php#L735
</md:method>

<md:method>
/**
	 * Called when file upload started
	 * @param  Input $in Input buffer
	 * @return void
	 */
public function onUploadFileStart($in)
link:https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/HTTPRequest/Generic.php#L774
</md:method>

<md:method>
/**
	 * Called when chunk of incoming file has arrived
	 * @param  Input   $in   Input buffer
	 * @param  boolean $last Last?
	 * @return void
	 */
public function onUploadFileChunk($in, $last = false)
link:https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/HTTPRequest/Generic.php#L795
</md:method>

<md:method>
/**
	 * Returns path to directory of temporary upload files
	 * @return string
	 */
public function getUploadTempDir()
link:https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/HTTPRequest/Generic.php#L843
</md:method>

<md:method>
/**
	 * Tells whether the file was uploaded via HTTP POST
	 * @param  string  $path The filename being checked
	 * @return boolean       Whether if this is uploaded file
	 */
public function isUploadedFile($path)
link:https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/HTTPRequest/Generic.php#L855
</md:method>

<md:method>
/**
	 * Moves an uploaded file to a new location
	 * @param  string  $filename The filename of the uploaded file
	 * @param  string  $dest     The destination of the moved file
	 * @return boolean           Success
	 */
public function moveUploadedFile($filename, $dest)
link:https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/HTTPRequest/Generic.php#L876
</md:method>

<md:method>
/**
	 * Read request body from the file given in REQUEST_BODY_FILE parameter
	 * @return boolean Success
	 */
public function readBodyFile()
link:https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/HTTPRequest/Generic.php#L887
</md:method>

<md:method>
/**
	 * Replacement for default parse_str(), it supoorts UCS-2 like this: %uXXXX
	 * @param  string  $s      String to parse
	 * @param  array   &$var   Reference to the resulting array
	 * @param  boolean $header Header-style string
	 * @return void
	 */
public static function parse_str($s, &$var, $header = false)
link:https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/HTTPRequest/Generic.php#L912
</md:method>

<div class="clearboth"></div>


<!--/ include-namespace -->
