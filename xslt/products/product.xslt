<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:products="http://www.dell.com/translation-hub/products">

	<xsl:output method="html" indent="yes" encoding="utf-8" media-type="text/xml" />
	<xsl:param name="group" />

	<xsl:template match="products:products">
		<xsl:element name="select">
			<xsl:attribute name="id">techspecs</xsl:attribute>
			<xsl:attribute name="class">form-control</xsl:attribute>
			<xsl:if test="normalize-space($group)=''">
				<xsl:attribute name="disabled">disabled</xsl:attribute>
			</xsl:if>
			<xsl:element name="option">
				<xsl:attribute name="value"></xsl:attribute>
				<xsl:attribute name="selected">selected</xsl:attribute>
				<xsl:text>Choose Technical Specification Type</xsl:text>
			</xsl:element>
			<xsl:apply-templates select="products:group[@id=$group]/products:product">
				<xsl:sort select="@name" data-type="text" order="ascending" case-order="lower-first" />
			</xsl:apply-templates>
		</xsl:element>
	</xsl:template>

	<xsl:template match="products:product">
		<xsl:element name="option">
			<xsl:attribute name="data-moduleId">
				<xsl:value-of select="@moduleId"/>
			</xsl:attribute>
			<xsl:attribute name="value">
				<xsl:value-of select="@folder"/>
			</xsl:attribute>
			<xsl:value-of select="@name"/>
		</xsl:element>
	</xsl:template>

</xsl:stylesheet>

