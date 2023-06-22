<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:content="http://www.dell.com/translation-hub/content" xmlns:generic="http://www.dell.com/translation-hub/generic" xmlns:product="http://www.dell.com/translation-hub/product" xmlns:locales="http://www.dell.com/translation-hub/locales" xmlns:tokens="http://www.dell.com/translation-hub/tokens" xmlns:exslt="http://exslt.org/common" xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="exslt msxsl">
  <xsl:include href="preview-master.xslt"/>
  <xsl:output method="html" indent="yes" encoding="utf-8" media-type="text/xml" />
  <xsl:param name="environment"/>
  <xsl:param name="country"/>
  <xsl:param name="language"/>
  <xsl:param name="region"/>
  <xsl:param name="productgroup"/>
  <xsl:param name="preview"/>
  <xsl:param name="caption"/>
  
  <xsl:template match="generic:root">  
	<!-- Start of HTML Preview and Source -->
	<xsl:variable name="output">
		<xsl:element name="div">
			<xsl:attribute name="class">richhtml</xsl:attribute>
			<xsl:element name="span">
				<xsl:attribute name="class">htmllabel</xsl:attribute>
				HTML Preview
			</xsl:element>			
			<xsl:element name="div">
				<xsl:attribute name="class">copy</xsl:attribute>
				<xsl:element name="button">
					<xsl:attribute name="data-locales">
						<xsl:value-of select="concat('htmlpreview-', $language, $country)"/>
					</xsl:attribute>
					<xsl:attribute name="data-text">Copy</xsl:attribute>
					<xsl:attribute name="data-text-copied">Copied</xsl:attribute>
					<xsl:attribute name="class">copyButton</xsl:attribute>
					Copy
				</xsl:element>
			</xsl:element>
			<xsl:element name="div">
				<xsl:attribute name="class">clear</xsl:attribute>
			</xsl:element>
			<xsl:element name="div">
				<xsl:attribute name="class">
					<xsl:value-of select="concat('display', ' ', 'htmlpreview-', $language, $country)"/>
				</xsl:attribute>
				<xsl:apply-templates select="generic:content/product:techspecs">
					<xsl:with-param name="environment" select="$environment"/>
					<xsl:with-param name="country" select="$country"/>
					<xsl:with-param name="language" select="$language"/>
					<xsl:with-param name="region" select="$region"/>
					<xsl:with-param name="productgroup" select="$productgroup"/>
					<xsl:with-param name="richhtml">true</xsl:with-param>
				</xsl:apply-templates>
			</xsl:element>
		</xsl:element>
		<xsl:element name="div">
			<xsl:attribute name="class">rawhtml</xsl:attribute>
			<xsl:element name="span">
				<xsl:attribute name="class">htmllabel</xsl:attribute>
				HTML Source
			</xsl:element>
			<xsl:element name="div">
				<xsl:attribute name="class">copy</xsl:attribute>
				<xsl:element name="button">
					<xsl:attribute name="data-locales">
						<xsl:value-of select="concat('htmlsource-', $language, $country)"/>
					</xsl:attribute>
					<xsl:attribute name="data-text">Copy</xsl:attribute>
					<xsl:attribute name="data-text-copied">Copied</xsl:attribute>
					<xsl:attribute name="class">copyButton</xsl:attribute>
					Copy
				</xsl:element>
			</xsl:element>
			<xsl:element name="div">
				<xsl:attribute name="class">clear</xsl:attribute>
			</xsl:element>
			<xsl:element name="div">
				<xsl:attribute name="class">
					<xsl:value-of select="concat('source', ' ', 'htmlsource-', $language, $country)"/>
				</xsl:attribute>
				<xsl:apply-templates select="generic:content/product:techspecs">
					<xsl:with-param name="environment" select="$environment"/>
					<xsl:with-param name="country" select="$country"/>
					<xsl:with-param name="language" select="$language"/>
					<xsl:with-param name="region" select="$region"/>
					<xsl:with-param name="productgroup" select="$productgroup"/>
					<xsl:with-param name="richhtml">false</xsl:with-param>
				</xsl:apply-templates>
			</xsl:element>
		</xsl:element>
		<xsl:element name="div">
			<xsl:attribute name="class">clear</xsl:attribute>
		</xsl:element>
	</xsl:variable>
	<!-- End of HTML Preview and Source -->

	<xsl:choose>
		<xsl:when test="$preview = 'true'">

			<xsl:element name="div">
				<xsl:attribute name="id">results</xsl:attribute>
				<xsl:copy-of select="$output"/>
			</xsl:element>

		</xsl:when>
		<xsl:otherwise>

			<xsl:element name="div">
				<xsl:attribute name="id">
					<xsl:value-of select="concat('results-', $language, $country)"/>
				</xsl:attribute>
				<xsl:element name="button">
					<xsl:attribute name="type">button active</xsl:attribute>
					<xsl:attribute name="class">collapsible2 active</xsl:attribute>
					<xsl:value-of select="$caption"/>
				</xsl:element>
				<xsl:element name="div">
					<xsl:attribute name="class">content</xsl:attribute>
					<xsl:attribute name="style">display: none</xsl:attribute>
					<xsl:copy-of select="$output"/>
				</xsl:element>
			</xsl:element>

		</xsl:otherwise>
	</xsl:choose>
  </xsl:template>

  <xsl:template match="product:techspecs">
	<xsl:param name="environment"/>
	<xsl:param name="country"/>
	<xsl:param name="language"/>
	<xsl:param name="region"/>
	<xsl:param name="productgroup"/>
	<xsl:param name="richhtml"/>
	<xsl:apply-templates>
        <xsl:with-param name="environment" select="$environment"/>
        <xsl:with-param name="country" select="$country"/>
        <xsl:with-param name="language" select="$language"/>
        <xsl:with-param name="region" select="$region"/>
		<xsl:with-param name="productgroup" select="$productgroup"/>
		<xsl:with-param name="richhtml" select="$richhtml"/>
      </xsl:apply-templates>
  </xsl:template>

</xsl:stylesheet>

