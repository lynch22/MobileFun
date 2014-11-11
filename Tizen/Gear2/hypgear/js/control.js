(function() {
	var wrist = null, wristData = null, WU_CONTEXT_TYPE = 'WRIST_UP';
	var power = null;

	if (window.webapis && window.webapis.motion !== undefined) {
		wrist = window.webapis.motion;
		power = tizen.power;
		console.log('Power/wrist found');

		start();

		power.request('SCREEN', 'SCREEN_NORMAL');
	} else {
		console.log('Power/wrist not found');
	}

	/**
	 * @param {string}
	 *            eventName
	 */
	function handleWristUpChange() {
		console.log('Wrist up occured : ');
		tizen.application.getCurrentApplication().hide();
		power.release('SCREEN');
		tizen.application.getCurrentApplication().exit();
	}

	/**
	 * Registers a change listener
	 * 
	 * @public
	 */
	function start() {
		wrist.start(WU_CONTEXT_TYPE, function onWristSuccess() {
			handleWristUpChange();
		});
	}

	/**
	 * Unregisters a change listener
	 * 
	 * @public
	 */
	function stop() {
		wrist.stop(WU_CONTEXT_TYPE);
		power.turnScreenOff();
	}
	/**
	 * Initializes the module
	 */
	function init() {
		if (window.webapis && window.webapis.motion !== undefined) {
			wrist = window.webapis.motion;

			power = tizen.power;
			power.request('SCREEN', 'SCREEN_NORMAL');
		}
	}

	return {
		init : init,
		start : start,
		stop : stop,
	};

})();
