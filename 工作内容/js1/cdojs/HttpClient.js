function Return() {
	this.nCode = 0;
	this.getCode = function() {
		return this.nCode
	};
	this.setCode = function(a) {
		this.nCode = a
	};
	this.strText = "";
	this.getText = function() {
		return this.strText
	};
	this.setText = function(a) {
		this.strText = a
	};
	this.strInfo = "";
	this.getInfo = function() {
		return this.strInfo
	};
	this.setInfo = function(a) {
		this.strInfo = a
	}
}

function HttpClient(d) {
	this.strServletURL = d;
	this.SERVICENAME_KEY = "strServiceName";
	this.TRANSNAME_KEY = "strTransName";
	this.getServletURL = function() {
		return this.strServletURL
	};
	var e = function(a) {
		var b = a.responseXML;
		return b.documentElement
	}, f = this,
		b = function(a, e, b) {
			if (e.test(a.name) == false) {
				throw "Invalid component's name";
				return -1
			}
			var d = a.cdodatatype;
			if (typeof d == "undefined") {
				throw "cdodatatype undefined";
				return -1
			}
			var c = a.cdodataregex;
			if (typeof c != "undefined")
				if (c.test(a.value) == false)
					if (onVerifyFailed != null) {
						onVerifyFailed(a);
						return -1
					}
			switch (d.toLowerCase()) {
				case "byte":
					b.setByteValue(a.name, a.value);
					break;
				case "short":
					b.setShortValue(a.name, a.value);
					break;
				case "integer":
					b.setIntegerValue(a.name, a.value);
					break;
				case "long":
					b.setLongValue(a.name, a.value);
					break;
				case "float":
					b.setFloatValue(a.name, a.value);
					break;
				case "double":
					b.setDoubleValue(a.name, a.value);
					break;
				case "string":
					b.setStringValue(a.name, a.value);
					break;
				case "date":
					b.setDateValue(a.name, a.value);
					break;
				case "time":
					b.setTimeValue(a.name, a.value);
					break;
				case "datetime":
					b.setDateTimeValue(a.name, a.value)
			}
			return 0
		}, c = function(g, e) {
			for (var c = g.elements, f = /([a-z]|[A-Z])([a-z]|[A-Z]|[0-9])*/, a = 0; a < c.length; a = a + 1) {
				var d = c[a].tagName.toLowerCase();
				if (d == "input") {
					switch (c[a].type) {
						case "checkbox":
						case "radio":
							if (c[a].checked == true)
								if (b(c[a], f, e) == -1) return -1;
							break;
						case "hidden":
						case "password":
						case "text":
							if (b(c[a], f, e) == -1) return -1
					}
					continue
				} else if (d == "button" || d == "select" || d == "textarea")
					if (b(c[a], f, e) == -1) return -1
			}
			return 0
		};
	this.submit = function(k, l, n, m, i) {
		var b = new CDO;
		if (c(n, b) != 0) return null;
		var a = null;
		while (true) {
			if (window.XMLHttpRequest) a = new XMLHttpRequest;
			else if (window.ActiveXObject) a = new ActiveXObject("Microsoft.XMLHTTP");
			var k = b.getStringValue("strServiceName"),
				l = b.getStringValue("strTransName"),
				g = "strServiceName=" + k + "&strTransName=" + l;
			try {
				var h = b.toXML(),
					j = encodeURI(this.strServletURL + "?" + g) + "&$$CDORequest$$=" + encodeURIComponent(h);
				if (j.length > 1024 || !(i == true)) {
					a.open("POST", encodeURI(this.strServletURL + "?" + g), false);
					a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
					a.send("$$CDORequest$$=" + encodeURIComponent(h))
				} else {
					a.open("GET", j, false);
					a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
					!(i == true) && a.setRequestHeader("If-Modified-Since", "0");
					a.send(null)
				}
			} catch (o) {
				return null
			}
			if (a.status == 200 || a.status == 0) break;
			if (a.status > 1e4) continue;
			return null
		}
		try {
			var f = a.responseXML.documentElement.childNodes,
				d = new CDO;
			d.fromXML(f[0].childNodes[0]);
			f.length > 1 && m.fromXML(f[1].childNodes[0]);
			var e = new Return;
			e.nCode = d.getIntegerValue("nCode");
			e.strInfo = d.getStringValue("strInfo");
			e.strText = d.getStringValue("strText")
		} catch (o) {
			return null
		}
		return e
	};
	this.loadXML = function(d, c) {
		var a = null;
		while (true) {
			if (window.XMLHttpRequest) a = new XMLHttpRequest;
			else if (window.ActiveXObject) a = new ActiveXObject("Microsoft.XMLHTTP");
			try {
				a.open("GET", d, false);
				a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
				!(c == true) && a.setRequestHeader("If-Modified-Since", "0");
				a.send(null)
			} catch (g) {
				return null
			}
			if (a.status == 200 || a.status == 0) break;
			if (a.status > 1e4) continue;
			return null
		}
		try {
			var b = new CDO,
				f = e(a);
			b.fromXML(f);
			return b
		} catch (g) {
			return null
		}
	};
	this.loadText = function(d, c) {
		var a = null;
		while (true) {
			if (window.XMLHttpRequest) a = new XMLHttpRequest;
			else if (window.ActiveXObject) a = new ActiveXObject("Microsoft.XMLHTTP");
			try {
				a.open("GET", d, false);
				a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
				!(c == true) && a.setRequestHeader("If-Modified-Since", "0");
				a.send(null)
			} catch (e) {
				return null
			}
			if (a.status == 200 || a.status == 0) break;
			if (a.status > 1e4) continue;
			return null
		}
		var b = a.responseText;
		return b
	};
	this.raiseLoadText = function(d, c, b) {
		var a = null;
		if (window.XMLHttpRequest) a = new XMLHttpRequest;
		else if (window.ActiveXObject) a = new ActiveXObject("Microsoft.XMLHTTP");
		if (b != null && b != undefined) a.onreadystatechange = function() {
			if (a.readyState != 4) return;
			if (a.status != 200 && a.status != 0) {
				b(null);
				return
			}
			var c = a.responseText;
			b(c)
		};
		try {
			a.open("GET", d, true);
			a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
			!(c == true) && a.setRequestHeader("If-Modified-Since", "0");
			a.send(null)
		} catch (e) {}
	};
	var a = false;
	this.handleTrans = function(e, m, i) {
		if (a == true) return Return.valueOf(-1, "Please do not click frequently");
		a = true;
		var b = null;
		while (true) {
			if (window.XMLHttpRequest) b = new XMLHttpRequest;
			else if (window.ActiveXObject) b = new ActiveXObject("Microsoft.XMLHTTP");
			var k = e.getStringValue("strServiceName"),
				l = e.getStringValue("strTransName"),
				g = "strServiceName=" + k + "&strTransName=" + l;
			try {
				var h = e.toXML(),
					j = encodeURI(this.strServletURL + "?" + g) + "&$$CDORequest$$=" + encodeURIComponent(h);
				if (j.length > 1024 || !(i == true)) {
					b.open("POST", encodeURI(this.strServletURL + "?" + g), false);
					b.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
					b.send("$$CDORequest$$=" + encodeURIComponent(h))
				} else {
					b.open("GET", j, false);
					b.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
					!(i == true) && b.setRequestHeader("If-Modified-Since", "0");
					b.send(null)
				}
			} catch (n) {
				a = false;
				return null
			}
			if (b.status == 200 || b.status == 0) break;
			if (b.status > 1e4) continue;
			a = false;
			return null;
		}
		var d = new Return;
		try {
			var f = b.responseXML.documentElement.childNodes,
				c = new CDO;
			c.fromXML(f[0].childNodes[0]);
			f.length > 1 && m.fromXML(f[1].childNodes[0]);
			d.nCode = c.getIntegerValue("nCode");
			d.strInfo = c.getStringValue("strInfo");
			d.strText = c.getStringValue("strText")
		} catch (n) {
			a = false;
			return null
		}
		a = false;
		return d
	};
	this.raiseTrans = function(c, f, b) {
		var a = null;
		var t = c;
		if (window.XMLHttpRequest) a = new XMLHttpRequest;
		else if (window.ActiveXObject) a = new ActiveXObject("Microsoft.XMLHTTP");
		if (b != null && b != undefined) a.onreadystatechange = function() {
			if (a.readyState != 4) return;
			if (a.status != 200 && a.status != 0) return;
			var f = new CDO,
				d = new Return;
			try {
				var e = a.responseXML.documentElement.childNodes,
					c = new CDO;
				c.fromXML(e[0].childNodes[0]);
				e.length > 1 && f.fromXML(e[1].childNodes[0]);
				d.nCode = c.getIntegerValue("nCode");
				d.strInfo = c.getStringValue("strInfo");
				d.strText = c.getStringValue("strText")
			} catch (g) {
				return
			}
			b(t, f, d)
		};
		var h = c.getStringValue("strServiceName"),
			i = c.getStringValue("strTransName"),
			d = "strServiceName=" + h + "&strTransName=" + i;
		try {
			var e = c.toXML(),
				g = encodeURI(this.strServletURL + "?" + d) + "&$$CDORequest$$=" + encodeURIComponent(e);
			if (g.length > 1024 || !(f == true)) {
				a.open("POST", encodeURI(this.strServletURL + "?" + d), true);
				a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
				a.send("$$CDORequest$$=" + encodeURIComponent(e))
			} else {
				a.open("GET", g, true);
				a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
				!(f == true) && a.setRequestHeader("If-Modified-Since", "0");
				a.send(null)
			}
		} catch (j) {}
	};
	this.onVerifyFailed = null
}