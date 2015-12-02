/**
 * Created by sousa on 11/22/2015.
 */
define([], function()
{
    var FilterUtility = function()
    {
        var utility = {};
        utility.isMatch = function(item, filters, criteria)
        {
            var isMatch = true;
            for(var y in filters)
            {
                var fieldName = filters[y].field;
                var value = item[fieldName];
                var isValid = false;

                if(filters[y].condition == 'equals')
                {
                    isValid = value == filters[y].value;
                }
                else if(filters[y].condition == 'notequals')
                {
                    isValid = value != filters[y].value;
                }
                else if(filters[y].condition == 'greater')
                {
                    isValid = value > filters[y].value;
                }
                else if(filters[y].condition == 'lower')
                {
                    isValid = value < filters[y].value;
                }

                if(!isValid && criteria == 'All')
                {
                    isMatch = false;
                    break;
                }
                else if(isValid && criteria == 'One')
                {
                    isMatch = true;
                    break;
                }
                else if(!isValid && criteria == 'One')
                {
                    isMatch = false;
                }
            }

            return isMatch;
        };

        utility.generateFilterContainer = function(sObjectName, title, description)
        {
            return {
                sObjectName: sObjectName,
                title: title,
                description: description,
                criteria: 'All',
                filters: []
            };
        };

        utility.generateFilter = function(title, fieldName, value, condition)
        {
            return {
                sObjectName: null,
                title: title,
                description: '',
                criteria: 'All',
                filters:
                    [
                        {
                            field: fieldName,
                            value: value,
                            condition: condition
                        }
                    ]
            };
        };

        return utility;
    };

    return FilterUtility;
});
