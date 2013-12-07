/**
 * @author nithin
 */
// Add State Options
for (i = 0; i <= 50; i++) 
{
    $('#actype_select').append('<option value="actype' + i + '">State ' + i + '</option>');
    $('#state_select_show').append('<option value="state' + i + '">State ' + i + '</option>');
}

addCites();
addTheaters();

$("#city_select").parent().parent().hide();
$("#theater_select").parent().parent().hide();

function addCites()
{
    ii = 0;

    for (i = 0; i <= 500; i++) 
    {
        if ((i % 10) == 0) 
        {
            ii++;
        }
        $('#city_select').append('<option value="city' + i + '" id="state' + ii + '">City ' + i + '</option>');
        $('#city_select_show').append('<option value="city' + i + '" id="state' + ii + '">City ' + i + '</option>');
    }
}

function addTheaters() 
{
    ii = 0;

    for (i = 0; i <= 1000; i++) 
    {
        if ((i % 10) == 0) 
        {
            ii++;
        }
        $('#theater_select').append('<option value="theater' + i + '" id="city' + ii + '">Theater ' + i + '</option>');
        $('#theater_select_show').append('<option value="theater' + i + '" id="city' + ii + '">Theater ' + i + '</option>');
    }
}

$('#state_select').change(function() 
{
    var selectedState = $(this).val();
    var selectFirst = 0;
    addCites();

    $("#city_select option").each(function() 
    {
        if ($(this).attr('id') != selectedState) 
        {
            $(this).remove();
        } 
        else 
        {
            if (selectFirst < 1) 
            {
                $(this).attr('id', selectedState).attr('selected', 'selected');
            }
            selectFirst++;
        }
    });
    $("#city_select").parent().parent().show();

    if ($('#city_select option').size() == 0) 
    {
        $('#city_select').append('<option value="nocity">No City Found</option>');
    }
});

$('#city_select').change(function() 
{
    var selectedCity = $(this).val();
    var selectFirst = 0;
    addTheaters();

    $("#theater_select option").each(function() 
    {
        if ($(this).attr('id') != selectedCity) 
        {
            $(this).remove();
        } 
        else 
        {
            if (selectFirst < 1) 
            {
                $(this).attr('id', selectedCity).attr('selected', 'selected');
            }
            selectFirst++;
        }
    });
    $("#theater_select").parent().parent().show();

    if ($('#theater_select option').size() == 0) 
    {
        $('#theater_select').append('<option value="notheater">No Theater Found Near You</option>');
    }
});​