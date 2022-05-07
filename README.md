# 20 Years of U.S. Hate Crimes
This project is to visualize reported hate crime incidents occured in the U.S., from 2001 to 2020.
Topics include 1) the volume of hate crime victims across the U.S. states per year, 2) changes of the victim volume over the 20 years per state, 3) incident volume for each different bias type per year, 4) distribution of the crimes by the offense types over the 20 years, 5) size of the crimes for each different victim’s type per year, and 6) hierarchy of the place types where the crimes had occurred the most.  

Link to my project site: https://klarakang.github.io/DATA732Final/

My code repo: https://github.com/KlaraKang/DATA732Final

Goals: By visualizing 20 years of the hate crime data for each of these topics, I would like to find patterns of the incident, such as when the hate crimes occurred the most, where these crimes took place, who the victims were, how the crimes were motivated, and how the crimes were carried out.

Data Source: Federal Bureau of Investigation Crime Data Explorer
The Hate Crime Statistics dataset (Years: 1991-2020, File size: 4.57MB, Last modified: Oct.25, 2021)
URL: https://crime-data-explorer.app.cloud.gov/pages/downloads

About the dataset and data preperations:
The dataset includes the number of incidents, offenses, victims, and location types in reported crimes between 1991 and 2020 that are motivated in whole, or in part, by an offender’s bias against the victim’s perceived race, gender, gender identity, religion, disability, sexual orientation, or ethnicity. According to the data source website, this data are captured by indicating the element of bias present in offenses already being reported to the FBI's Uniform Crime Reporting (UCR) Program and contributed by all law enforcement agencies, whether they submit Summary Reporting System (SRS) or National Incident-Based Reporting System (NIBRS) reports.

For this data visualization project, I only included the records reported between 2001 and 2020, with a total of 145,847 hate crime incidents against 180,925 victims.

Each incident can be reported with up to five bias motivations. The proportion of the incident records with multiple biases are 4.5% of the total incident counts (6,494/145,847) and 4.7% of the total victim counts (8,570/180,925). To ensure every incident types are included in the visualization, I have generated new datasets that splits multiple types of biases, offenses, and locations into multiple rows.

This dataset doesn’t include geographic location information, Latitude and Longitude. To visualize the U.S. state data in a map, I downloaded the geographical information from a Google developer’s site <https://developers.google.com/public-data/docs/canonical/states_csv> and plugged them into each row of the crime dataset.  

References:
2020 Hate Crimes Statistics on the FBI website.
https://www.justice.gov/crs/highlights/2020-hate-crimes-statistics
*Please note that the 2020 hate crime statistics displayed on the FBI website is based on the data as of Auguest 2021. However, the dataset used in my project is last updated October 2021 and has more number of incident records.