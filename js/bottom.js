/*window.onscroll = function() {myFunction()};

var header = document.getElementById("navigator");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
	header.classList.add("sticky");
  } else {
	header.classList.remove("sticky");
  }
}*/

function sectionCollapsible(id)
{
	var coll = document.getElementsByClassName(id);
	var i;

	for (i = 0; i < coll.length; i++) {
	  coll[i].addEventListener("click", function() {
		this.classList.toggle("active");
		var content = this.nextElementSibling;
		if (content.style.display === "block") {
		  content.style.display = "none";
		} else {
		  content.style.display = "block";
		}
	  });
	}
}

sectionCollapsible("collapsible");

//Start of checking if XML file exists
function urlExists(url) {
    try {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status != 404;
    } catch (error) {
        return;
    }
}
//End of checking if XML file exists

//********************* Start of Control Panel ********************* 
var fileProduct = "content/data/definitions/products.xml?v=" + Math.random();

if(urlExists(fileProduct))
	magicXML.transformAndReplace('#products', fileProduct, 'xslt/products/group.xslt');
else
	alert("Products.xml file is missing.");


function components(id,s)
{	
	magicXML.transformAndReplace(id, fileProduct, 'xslt/products/product.xslt', [{ name: 'group', value: s.toString()}]);
}

//Subsequent change of value (Products)
$('#products').on('change', function() {
	if($(this).val() == '')
	{
		$('#techspecs').prop("disabled", true);
		$('#techspecs').val('');
		$("#editingzone").html("");
		$("#results").html("");
		$("#container").html("");
		return;
	}
	components("#techspecs", $(this).val());
	$('#techspecs').prop("disabled", false);
});
//********************* End of Control Panel ********************* 


//********************* Start of Editing Panel ********************* 

function editing()
{
	if(!$(this).val())
	{
		$("#editingzone").html("");
		$("#results").html("");
		$("#container").html("");
		return;
	}

	var filePath = 'content/data/products/' + $(this).val() + '/';

	if(urlExists(filePath  + 'english.xml'))
	{

		$("#editingzone").html($('<img>',{class:'loader',src:'images/loader-dots.gif'}));

		$("#editingzone").append($('<div id="counter">Initializing...</div>'));
	
		//$("#results").html($('<img>',{class:'loader',src:'images/loader-dots.gif'}));

		$("#results").html("");

		$("#container").hide();

		var xmlfile = [
		{'language':'zh', 'country':'cn', 'filename':'simplified-chinese', 'caption':'Simplified Chinese (ZH-CN)', 'region':'apj'},
		{'language':'zh', 'country':'hk', 'filename':'traditional-chinese', 'caption':'Traditional Chinese (ZH-HK | ZH-TW)', 'region':'apj'},
		{'language':'ja', 'country':'jp', 'filename':'japanese', 'caption':'Japanese (JA-JP)', 'region':'apj'},
		{'language':'ko', 'country':'kr', 'filename':'korean', 'caption':'Korean (KO-KR)', 'region':'apj'},
		{'language':'de', 'country':'at', 'filename':'german', 'caption':'German (DE-AT | DE-DE | DE-CH)', 'region':'emea'},
		{'language':'fr', 'country':'be', 'filename':'french', 'caption':'French (FR-BE | FR-FR | FR-LU | FR-CH)', 'region':'emea'},
		{'language':'nl', 'country':'be', 'filename':'dutch', 'caption':'Dutch (NL-BE | NL-NL)', 'region':'emea'},
		{'language':'cs', 'country':'cz', 'filename':'czech', 'caption':'Czech (CS-CZ)', 'region':'emea'},
		{'language':'da', 'country':'dk', 'filename':'danish', 'caption':'Danish (DA-DK)', 'region':'emea'},
		{'language':'fi', 'country':'fi', 'filename':'finnish', 'caption':'Finnish (FI-FI)', 'region':'emea'},
		{'language':'el', 'country':'gr', 'filename':'greek', 'caption':'Greek (EL-GR)', 'region':'emea'},
		{'language':'it', 'country':'it', 'filename':'italian', 'caption':'Italian (IT-IT)', 'region':'emea'},
		{'language':'no', 'country':'no', 'filename':'norwegian', 'caption':'Norwegian (NO-NO)', 'region':'emea'},
		{'language':'pl', 'country':'pl', 'filename':'polish', 'caption':'Polish (PL-PL)', 'region':'emea'},
		{'language':'ar', 'country':'ae', 'filename':'arabic', 'caption':'Arabic (AR-AE | AR-DZ | AR-MA | AR-TN)', 'region':'emea'},
		{'language':'ro', 'country':'ro', 'filename':'romanian', 'caption':'Romanian (RO-RO)', 'region':'emea'},
		{'language':'sk', 'country':'sk', 'filename':'slovene', 'caption':'Slovene (SK-SK)', 'region':'emea'},
		{'language':'he', 'country':'il', 'filename':'hebrew', 'caption':'Hebrew (HE-IL)', 'region':'emea'},
		{'language':'hu', 'country':'hu', 'filename':'hungarian', 'caption':'Hungarian (HU-HU)', 'region':'emea'},
		{'language':'tr', 'country':'tr', 'filename':'turkish', 'caption':'Turkish (TR-TR)', 'region':'emea'},
		{'language':'pt', 'country':'pt', 'filename':'portugese', 'caption':'Portugese (PT-PT)', 'region':'emea'},
		{'language':'ru', 'country':'ru', 'filename':'russian', 'caption':'Russian (RU-RU)', 'region':'emea'},
		{'language':'es', 'country':'es', 'filename':'spanish', 'caption':'Spanish (ES-ES)', 'region':'emea'},
		{'language':'sv', 'country':'se', 'filename':'swedish', 'caption':'Swedish (SV-SE)', 'region':'emea'},
		{'language':'es', 'country':'ar', 'filename':'latin-america', 'caption':'Spanish (ES-AR | ES-CL | ES-CO | ES-MX | ES-PE | ES-VL)', 'region':'latam'},
		{'language':'pt', 'country':'br', 'filename':'portugese-brazil', 'caption':'Portuguese Brazil (PT-BR)', 'region':'latam'},
		{'language':'fr', 'country':'ca', 'filename':'french-canada', 'caption':'French Canada (FR-CA)', 'region':'ca'}
		
		];
		
		var percentage="";

		for(var i=0; i < xmlfile.length + 2; i++)
		{
			if(i < xmlfile.length)
			{
				$("#container").append($('<div>',{id:'results-' + xmlfile[i].language + xmlfile[i].country}));
				magicXML.transformAndReplace("#results-" + xmlfile[i].language + xmlfile[i].country, filePath  + xmlfile[i].filename + '.xml?v=' + Math.random(), 'xslt/preview.xslt', [{ name: 'productgroup', value: $("#products").val().toString()}, { name: 'language', value: xmlfile[i].language}, { name: 'country', value: xmlfile[i].country}, { name: 'preview', value: 'false'}, { name: 'caption', value: xmlfile[i].caption}]);
			}
			else if(i == xmlfile.length + 1)
			{		
				//English US
				//English Editing Panel (Loading the editing panel ast last)
				magicXML.transformAndReplace("#editingzone", filePath  + 'english.xml?v=' + Math.random(), 'xslt/editing-panel.xslt', [{ name: 'productgroup', value: $("#products").val().toString()}]);
			}
			else if(i == xmlfile.length)
			{
				magicXML.transformAndReplace("#results", filePath  + 'english.xml?v=' + Math.random(), 'xslt/preview.xslt', [{ name: 'productgroup', value: $("#products").val().toString()}, { name: 'language', value: 'en'}, { name: 'country', value: 'us'}, { name: 'preview', value: 'true'}]);
			}

			percentage=((i/(xmlfile.length + 2)) * 100).toFixed().toString() + "%";
			$("#counter").text(percentage);
		}	
				
		$("#container").show();

		//Start of Auto resizing
		$(function () {
			$("input.unique").autoGrowInput({ minWidth: 10, comfortZone: 10 });
		});
		//End of Auto resizing
	
		sectionCollapsible("collapsible2");
	}
	else	
		alert("The source file not found - ".concat($(this).val(), '/english.xml'));
}

$('nav').on('change', '#techspecs', editing);
//********************* End of Editing Panel ********************* 



//Start of Copy to Clipboard
$(document).on("click", ".copyButton", function() {
	var copyTarget = $(this).data("locales");
    copyToClipboard($(this), document.getElementsByClassName(copyTarget));
});

function copyToClipboard(copyButton, copyTarget) {
    var $temp = $("<textarea>");
    $("body").append($temp);
	var clone  = $(copyTarget).clone();
	clone.appendTo('body').find(':hidden').remove();
	var text = clone.text();
	clone.remove();
    $temp.val(text.replace(/\s*[\r\n]+\s*/g, '\n').replace(/(<[^\/][^>]*>)\s*/g, '$1').replace(/\s*(<\/[^>]+>)/g, '$1')).select();
	
	copyButton.text(copyButton.attr("data-text-copied"));     
	setTimeout(function() {$(copyButton).text(copyButton.attr("data-text"));}, 1500);

    document.execCommand("copy");
    $temp.remove();
}
//End of Copy to Clipboard